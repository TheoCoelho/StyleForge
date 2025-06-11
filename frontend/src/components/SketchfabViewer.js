import React from 'react';

const SketchfabViewer = ({ url, title }) => (
  <div className="sketchfab-embed-wrapper" style={{ width: '100%', height: '100%', minHeight: 400, border: '2px solid #1CAAD9' }}>
    <iframe
      title={title || "Modelo 3D"}
      frameBorder="0"
      allowFullScreen
      mozallowfullscreen="true"
      webkitallowfullscreen="true"
      allow="autoplay; fullscreen; xr-spatial-tracking"
      width="100%"
      height="100%"
      src={url}
      style={{ width: '100%', height: '100%', minHeight: 400, border: 0 }}
    ></iframe>
  </div>
);

export default SketchfabViewer; 