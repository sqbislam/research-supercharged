import React from 'react';

interface PDFViewerProps {
  url: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  console.debug('PDFViewerProps', { url });
  return (
    <div className='pdf-viewer'>
      <iframe
        src={url}
        key={url}
        title='PDF Viewer'
        style={{
          width: '80vw',
          height: '80vh',
          border: 'none',
        }}
      ></iframe>
    </div>
  );
};

export default PDFViewer;
