import React from 'react';
import SketchfabViewer from '../SketchfabViewer';

const ThreeDEnvironment = () => (
  <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'auto' }}>
    <SketchfabViewer
      url="https://sketchfab.com/models/2c3e2511d0d14abf952d4cacd55db96a/embed?ui_theme=dark"
      title="Male tshirt"
    />
  </div>
);

export default ThreeDEnvironment; 