import React from 'react';

const PDFPreview = ({ pdfUrl}) => {
  const iframeStyle = {
    width: `100%`,
    height: `65vh`,
    marginTop:"45px",
    marginBottom:"45px"
  };

  return (
    <div>
      <iframe src={pdfUrl} style={iframeStyle} frameBorder="0" ></iframe>
    </div>
  );
};

export default PDFPreview;