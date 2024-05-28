import xml.etree.ElementTree as ET 
import logging
class XMLParser():
    
    async def parse(self, xml_data: str):
        namespace = {'atom': 'http://www.w3.org/2005/Atom', 'arxiv': 'http://arxiv.org/schemas/atom', 'opensearch': 'http://a9.com/-/spec/opensearch/1.1/'}
       
        # Parse XML and return data
        res = []
        myroot = ET.fromstring(xml_data)
        # Extract data from XML entry
        for x in myroot.findall('.//atom:entry', namespace):
            try:
                print(x)
                title = await self.get_attribute('text', x, './/atom:title', namespace)
                summary = await self.get_attribute('text', x, './/atom:summary', namespace)
                doi = await self.get_attribute('text', x, './/arxiv:doi', namespace)
                category = await self.get_attribute('text', x, './/arxiv:primary_category', namespace, field='term')
                journal_ref = await self.get_attribute('text', x, './/arxiv:journal_ref', namespace)
                link = await self.get_attribute('link', x, './/atom:link', namespace)
                authors = await self.get_attribute('author', x, './/atom:author/atom:name', namespace)
                published_date = await self.get_attribute('text', x, './/atom:published', namespace)
                    
                res.append({'title': title, 'abstract': summary, 'doi': doi, 'link': link, 'authors': authors, 'category': category, 'journal_ref':journal_ref, 'published_date':published_date})
            except Exception as e:
                logging.error("Error in parsing XML data", e)
        return res
        
    async def get_attribute(self, type:str, el:ET.Element, path_str: str, namespace:dict[str, str], field:str='text'):
        if type == 'text':
            return await self.get_text(el, path_str, namespace, field)
        elif type == 'link':
            return await self.get_link(el, path_str, namespace)
        elif type == 'author':
            return await self.get_author(el, path_str, namespace)
    
    
    async def get_text(self, el:ET.Element, path_str: str, namespace:dict[str, str], field):
        try: 
            if field == 'text':
                return el.find(path_str, namespace).text
            else:
                return el.find(path_str, namespace).get(field)
           
        except Exception as e:
            logging.error("Error in extracting attribute "+ path_str, e)
            return None
    
    async def get_link(self, el:ET.Element, path_str: str, namespace:dict[str, str]):
        try:
            link = el.findall(path_str, namespace)
            for l in link:
                if l.attrib.get('title') and l.attrib['title'] == 'pdf':
                    return l.attrib.get('href')
        except Exception as e:
            logging.error("Error in extracting link "+ path_str, e)
            return None
        
    
    async def get_author(self, el:ET.Element, path_str: str, namespace:dict[str, str]):
        try:
            author_all = el.findall(path_str, namespace)
            authors = []
            for author in author_all:
                authors.append(author.text)
            return authors
        except Exception as e:
            logging.error("Error in extracting author "+ path_str, e)
            return []