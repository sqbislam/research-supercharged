import React from 'react';

interface PDFViewerProps {
  url: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url }) => {
  return (
    <div className='pdf-viewer'>
      <iframe
        src={url}
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
