import xml.etree.ElementTree as ET 

class XMLParser():
    def __init__(self, *args, **kwargs):
        self.xml = kwargs.get('xml')
        self.root = ET.fromstring(self.xml)
        self.data = self.parse()
    
    def parse():
        # Parse XML and return data
        
        pass
        