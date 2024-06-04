import logging
import time
import jwt
from app.core.config import settings

def decode_jwt(token: str) -> dict:
    try:
        logging.info('Decoding token')
        decoded_token = jwt.decode(token, settings.JWT_SECRET, algorithms=[settings.JWT_ALGORITHM], audience='authenticated')
        logging.info(decoded_token)
        return decoded_token if decoded_token["exp"] >= time.time() else None
    except Exception as e:

        return {}