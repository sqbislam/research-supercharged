import asyncio
import logging
from app.schemas.chat import ChatResponse
from app.services.researcher import Researcher
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from langchain_core.messages import HumanMessage, AIMessage


from websockets import ConnectionClosedOK


router = APIRouter()


@router.get("chain-test")
async def test():
    researcher = Researcher(["http://arxiv.org/pdf/1905.07844v1"])
    qa_chain = await researcher.get_qa_chain()
    output = await qa_chain.ainvoke('What is the main theme of the articles?')
    return output

async def lrt():
    await asyncio.sleep(1)
@router.websocket("/ws")
async def chat_with_article(websocket: WebSocket):
    await websocket.accept()
    researcher = None
    qa_chain = None
    
    while True:
        
        try:
            # Receive and log the client message
            user_msg = await websocket.receive_text()
            logging.info(f"Received message: {user_msg}")
            if "ping" in user_msg:
                url_list = user_msg.replace("ping:", "").split(",")
                researcher = Researcher(url_list)
                # Construct and send start response
                url_resp = ChatResponse(sender="bot", content="Hi, I am processing your documents and will be ready to answer your questions", type="start")
                await websocket.send_json(url_resp.model_dump())
                continue
   
            if researcher is None:
                error_resp = ChatResponse(sender="bot", content="Sorry, please refresh the page. Something went wrong", type="start")
                await websocket.send_json(error_resp.model_dump())
                
            if qa_chain is None:
                qa_chain = await researcher.get_qa_chain()
           
            # Send the message to the QA chain and get the response
            output = await qa_chain.ainvoke(user_msg)
            logging.info(f"QA Chain Output: {output['answer']}")

            # Construct and send the AI response
            resp = AIMessage(content=output['answer'])
            await websocket.send_json(resp.dict())

            # Send the end-response back to the client
            end_resp = ChatResponse(sender="bot", content="", type="end")
            await websocket.send_json(end_resp.model_dump())

        except WebSocketDisconnect as e:
            logging.info("WebSocket disconnected: {0}".format(e))
            # Optionally handle reconnection logic here
            break
        except ConnectionClosedOK:
            logging.info("Connection closed OK")
            break
        except Exception as e:
            logging.error(f"An error occurred: {e}")
            resp = ChatResponse(
                sender="bot",
                message="Sorry, something went wrong. Try again.",
                type="error",
            )
            await websocket.send_json(resp.model_dump())