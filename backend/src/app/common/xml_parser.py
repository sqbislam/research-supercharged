import xml.etree.ElementTree as ET 
import logging
class XMLParser():
    
    async def parse(self, xml_data: str):
        namespace = {'atom': 'http://www.w3.org/2005/Atom', 'arxiv': 'http://arxiv.org/schemas/atom', 'opensearch': 'http://a9.com/-/spec/opensearch/1.1/'}
        try:
            # Parse XML and return data
            res = []
            myroot = ET.fromstring(xml_data)
            print(myroot)
            for x in myroot.findall('.//atom:entry', namespace):
                print(x)
                title =x.find('.//atom:title', namespace).text
                summary = x.find('.//atom:summary', namespace).text
                doi = x.find('.//arxiv:doi', namespace).text
                link = x.find('.//atom:link', namespace).attrib['href']
                author_all = x.findall('.//atom:author/atom:name', namespace)
                authors = []
                for author in author_all:
                    authors.append(author.text)
                res.append([{'title': title, 'summary': summary, 'doi': doi, 'link': link, 'authors': authors}])
        except:
            logging.error("Error in parsing XML data")
        return res
        