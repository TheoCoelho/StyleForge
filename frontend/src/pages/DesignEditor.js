import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Excalidraw, exportToSvg } from '@excalidraw/excalidraw';
import { Tab } from '@headlessui/react';
import { PlusIcon, PhotoIcon, FolderIcon, ChevronDownIcon, ChevronUpIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline';
import ClothingConfig from '../components/ClothingConfig';

const DesignEditor = () => {
  const location = useLocation();
  const { id } = useParams();
  const excalidrawRef = useRef(null);
  const debounceTimeoutRef = useRef(null);

  const [tabs, setTabs] = useState([
    { id: 1, name: 'Design Principal', excalidrawElements: [], excalidrawAppState: {}, clothingConfig: {} },
  ]);
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);
  const [activeSidebarPanel, setActiveSidebarPanel] = useState(null);
  const [images, setImages] = useState([]);

  // Encontrar a tab ativa
  const activeTab = tabs.find(tab => tab.id === activeTabId);

  // Estado local da configuração da peça para o formulário (será sincronizado com a aba ativa)
  const [localClothingConfig, setLocalClothingConfig] = useState(activeTab?.clothingConfig || {});

  // Sincronizar estado local da configuração da peça com a aba ativa
  useEffect(() => {
    setLocalClothingConfig(activeTab?.clothingConfig || {});
  }, [activeTabId, activeTab]);

  const handleAddTab = () => {
    if (excalidrawRef.current && activeTab) {
       const elements = excalidrawRef.current.getSceneElements();
       const appState = excalidrawRef.current.getAppState();
       setTabs(tabs.map(tab =>
         tab.id === activeTabId
           ? { ...tab, excalidrawElements: elements, excalidrawAppState: appState, clothingConfig: localClothingConfig }
           : tab
       ));
    }

    const newTab = {
      id: Date.now(),
      name: `Design ${tabs.length + 1}`,
      excalidrawElements: [],
      excalidrawAppState: {},
      clothingConfig: {}
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setActiveSidebarPanel(null);
  };

  const handleTabChange = (index) => {
    if (excalidrawRef.current && activeTab) {
      const elements = excalidrawRef.current.getSceneElements();
      const appState = excalidrawRef.current.getAppState();
      setTabs(tabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, excalidrawElements: elements, excalidrawAppState: appState, clothingConfig: localClothingConfig }
          : tab
      ));
    }
    setActiveTabId(tabs[index].id);
    setActiveSidebarPanel(null);
  };

  // Carregar estado do excalidraw quando a tab ativa muda
  useEffect(() => {
    if (excalidrawRef.current && activeTab) {
      excalidrawRef.current.updateScene({
        elements: activeTab.excalidrawElements,
        appState: activeTab.excalidrawAppState,
      });
    }
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [activeTabId]);

  // Limpar timeout debounce ao desmontar o componente
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const handleExcalidrawChange = (elements, appState) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout(() => {
      setTabs(tabs =>
        tabs.map(tab =>
          tab.id === activeTabId
            ? { ...tab, excalidrawElements: elements, excalidrawAppState: appState }
            : tab
        )
      );
    }, 300);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setImages([...images, ...newImages]);
  };

  const handleClothingConfigChange = (config) => {
    setLocalClothingConfig(config);

    setTabs(tabs =>
      tabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, clothingConfig: config }
          : tab
      )
    );
  };

  const handleSaveDesign = async () => {
    if (excalidrawRef.current && activeTab) {
      const elements = excalidrawRef.current.getSceneElements();
      const appState = excalidrawRef.current.getAppState();

      const updatedTabs = tabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, excalidrawElements: elements, excalidrawAppState: appState, clothingConfig: localClothingConfig }
          : tab
      );
      setTabs(updatedTabs);

      const currentDesignData = updatedTabs.find(tab => tab.id === activeTabId);

      const designDataToSave = {
        name: currentDesignData.name,
        primary_color: currentDesignData.clothingConfig.primaryColor || '',
        fabric_type: currentDesignData.clothingConfig.fabricType || '',
        size: currentDesignData.clothingConfig.size || '',
        notes: currentDesignData.clothingConfig.additionalNotes || '',
        elements: JSON.stringify(currentDesignData.excalidrawElements),
        appState: JSON.stringify(currentDesignData.excalidrawAppState),
      };

      console.log('Dados do Design para Salvar:', designDataToSave);

      // TODO: Implementar chamada à API para salvar/atualizar o design
    }
  };

  return (
    <div className="flex h-[85vh] overflow-hidden">
      {/* Barra de Ícones Lateral (Estreita) */}
      <div className="w-16 bg-gray-200 flex flex-col items-center py-4 space-y-4 flex-shrink-0">
        <button
          onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'config' ? null : 'config')}
          className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            activeSidebarPanel === 'config' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-300'
          }`}
          title="Detalhes da Peça"
        >
           <Cog6ToothIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'upload' ? null : 'upload')}
           className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            activeSidebarPanel === 'upload' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-300'
          }`}
           title="Upload de Imagem"
        >
          <PhotoIcon className="w-6 h-6" />
        </button>
        <button
          onClick={() => setActiveSidebarPanel(activeSidebarPanel === 'library' ? null : 'library')}
           className={`p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 ${
            activeSidebarPanel === 'library' ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-300'
          }`}
           title="Biblioteca de Elementos"
        >
          <FolderIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Painel Lateral de Conteúdo (Expansível) */}
      <div className={`transition-all duration-300 ease-in-out ${activeSidebarPanel ? 'w-64 opacity-100' : 'w-0 opacity-0'}`}>
        {activeSidebarPanel && (
          <div className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto h-full">
            {/* Conteúdo Detalhes da Peça */}
            {activeSidebarPanel === 'config' && activeTab && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-700">Detalhes da Peça</h3>
                  <button
                    onClick={() => setActiveSidebarPanel(null)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <ClothingConfig onConfigChange={handleClothingConfigChange} clothingConfig={localClothingConfig} />
              </div>
            )}

            {/* Conteúdo Upload de Imagem */}
            {activeSidebarPanel === 'upload' && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-700">Upload de Imagem</h3>
                  <button
                    onClick={() => setActiveSidebarPanel(null)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload-panel"
                />
                <label
                  htmlFor="image-upload-panel"
                  className="block w-full text-center px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 text-gray-600 transition-colors duration-200"
                >
                  Arraste ou clique para fazer upload
                </label>
                {images.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Galeria</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {images.map((image) => (
                        <div
                          key={image.id}
                          className="relative aspect-square rounded-lg overflow-hidden shadow-sm"
                        >
                          <img
                            src={image.url}
                            alt={image.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Conteúdo Biblioteca de Elementos */}
            {activeSidebarPanel === 'library' && (
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-700">Biblioteca de Elementos</h3>
                  <button
                    onClick={() => setActiveSidebarPanel(null)}
                    className="p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <XMarkIcon className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                <p className="text-gray-600">Conteúdo da biblioteca de elementos...</p>
              </div>
            )}

            {/* Botão Salvar Design */}
            <div className="mt-auto p-4 border-t border-gray-200 flex-shrink-0">
              <button
                onClick={handleSaveDesign}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Salvar Design
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Área Principal com Tabs e Editor */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${activeSidebarPanel ? 'ml-4' : ''}`}>
        {/* Tabs */}
        <div className="bg-white border-b border-gray-200 flex-shrink-0">
          <Tab.Group selectedIndex={tabs.findIndex(tab => tab.id === activeTabId)} onChange={handleTabChange}>
            <Tab.List className="flex space-x-1 p-2 overflow-x-auto">
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  className={({ selected }) =>
                    `flex-shrink-0 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none ring-blue-500 ring-offset-2 transition-colors duration-200 ${
                      selected
                        ? 'bg-blue-500 text-white shadow'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  {tab.name}
                </Tab>
              ))}
              <button
                onClick={handleAddTab}
                className="flex-shrink-0 p-2 text-gray-500 hover:text-gray-700 focus:outline-none ring-blue-500 focus:ring-offset-2 rounded-lg transition-colors duration-200"
                title="Adicionar nova aba de design"
              >
                <PlusIcon className="w-5 h-5" />
              </button>
            </Tab.List>
          </Tab.Group>
        </div>

        {/* Editor Excalidraw */}
        <div className="flex-1 overflow-hidden">
          {activeTab && (
            <Excalidraw
              key={activeTabId}
              ref={excalidrawRef}
              initialData={{
                elements: activeTab.excalidrawElements,
                appState: activeTab.excalidrawAppState,
              }}
              onChange={handleExcalidrawChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DesignEditor; 