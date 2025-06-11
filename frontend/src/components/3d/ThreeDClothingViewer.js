import React from 'react';
import SketchfabViewer from '../SketchfabViewer';
import Excalidraw from '../Excalidraw';

const ThreeDClothingViewer = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        ...tudo aqui dentro comentado...
      </div> */}
      {/* Área Principal */}
      <div className="flex-1 flex flex-col">
        {/* Tabs */}
        {/* <div className="bg-white border-b border-gray-200"> ... </div> */}
        {/* Área de Edição */}
        <div className="flex-1 relative">
          {show3D && <ThreeDEnvironment />}
        </div>
      </div>
    </div>
  );
};

export default ThreeDClothingViewer; 