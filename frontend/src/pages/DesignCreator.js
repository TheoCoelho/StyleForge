import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Excalidraw } from '@excalidraw/excalidraw'; // Não é usado nesta página
import axios from 'axios'; // Para futuras chamadas à API

const DesignCreator = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedSubtype, setSelectedSubtype] = useState(null);
  const [clothingTypesData, setClothingTypesData] = useState([]);
  const [clothingSubtypesData, setClothingSubtypesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // TODO: Substituir por chamada real à API no futuro
  const categories = [
    { id: 'head', name: 'Cabeça' },
    { id: 'torso', name: 'Tronco' },
    { id: 'legs', name: 'Pernas' },
  ];

  // Dados mockados para demonstração - substituir por dados da API
  const mockClothingTypes = [
    { id: 1, name: 'Boné', category: 'head' },
    { id: 2, name: 'Chapéu', category: 'head' },
    { id: 3, name: 'Touca', category: 'head' },
    { id: 4, name: 'Camisa', category: 'torso' },
    { id: 5, name: 'Camiseta', category: 'torso' },
    { id: 6, name: 'Jaqueta', category: 'torso' },
    { id: 7, name: 'Calça', category: 'legs' },
    { id: 8, name: 'Bermuda', category: 'legs' },
    { id: 9, name: 'Shorts', category: 'legs' },
  ];

  const mockClothingSubtypes = [
    { id: 1, name: 'Jogger', clothing_type: 7 },
    { id: 2, name: 'Baggy', clothing_type: 7 },
    { id: 3, name: 'Skinny', clothing_type: 7 },
    { id: 4, name: 'Social', clothing_type: 4 },
    { id: 5, name: 'Polo', clothing_type: 4 },
    { id: 6, name: 'Casual', clothing_type: 4 },
    // Adicione mais subtipos conforme necessário
  ];

  useEffect(() => {
    // Simular o carregamento de dados da API
    setLoading(true);
    // Em um projeto real, faríamos chamadas axios.get para endpoints como /api/designs/types/ e /api/designs/subtypes/
    setTimeout(() => {
      setClothingTypesData(mockClothingTypes);
      setClothingSubtypesData(mockClothingSubtypes);
      setLoading(false);
    }, 500); // Simula delay da rede
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedType(null);
    setSelectedSubtype(null);
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    setSelectedSubtype(null);
  };

  const handleSubtypeSelect = (subtype) => {
    setSelectedSubtype(subtype);
  };

  const handleContinue = () => {
    if (selectedCategory && selectedType && selectedSubtype) {
      // Em um projeto real, você passaria os IDs para buscar/criar o design no backend
      navigate('/design/edit/new', {
        state: {
          category: selectedCategory.id,
          type: selectedType.id,
          subtype: selectedSubtype.id,
          // Você pode querer passar outros dados aqui
        },
      });
    }
  };

  // Filtrar tipos e subtipos com base nas seleções
  const filteredTypes = selectedCategory
    ? clothingTypesData.filter((type) => type.category === selectedCategory.id)
    : [];

  const filteredSubtypes = selectedType
    ? clothingSubtypesData.filter(
        (subtype) => subtype.clothing_type === selectedType.id
      )
    : [];

  if (loading) {
    return <div className="text-center text-gray-600">Carregando opções...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-600">Erro ao carregar opções: {error.message}</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Criar Novo Design</h1>
      
      {/* Seção da Silhueta */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecione a Repartição</h2>
        <div className="relative w-64 h-96 mx-auto bg-gray-200 rounded-full overflow-hidden shadow-inner">
          <div className="absolute inset-0 flex flex-col">
            {/* Cabeça */}
            <div
              className={`h-1/3 border-b-2 border-gray-300 flex items-center justify-center text-lg font-medium transition-colors duration-200 cursor-pointer ${
                selectedCategory?.id === 'head' ? 'bg-blue-200 border-blue-500 text-blue-800' : 'hover:bg-gray-300 text-gray-600'
              }`}
              onClick={() => handleCategorySelect({ id: 'head', name: 'Cabeça' })}
            >
              Cabeça
            </div>
            {/* Tronco */}
            <div
              className={`h-1/3 border-b-2 border-gray-300 flex items-center justify-center text-lg font-medium transition-colors duration-200 cursor-pointer ${
                selectedCategory?.id === 'torso' ? 'bg-blue-200 border-blue-500 text-blue-800' : 'hover:bg-gray-300 text-gray-600'
              }`}
              onClick={() => handleCategorySelect({ id: 'torso', name: 'Tronco' })}
            >
              Tronco
            </div>
            {/* Pernas */}
            <div
              className={`h-1/3 flex items-center justify-center text-lg font-medium transition-colors duration-200 cursor-pointer ${
                selectedCategory?.id === 'legs' ? 'bg-blue-200 border-blue-500 text-blue-800' : 'hover:bg-gray-300 text-gray-600'
              }`}
              onClick={() => handleCategorySelect({ id: 'legs', name: 'Pernas' })}
            >
              Pernas
            </div>
          </div>
        </div>
      </div>

      {/* Seção Carrossel de Tipos */}
      {selectedCategory && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecione o Tipo de Roupa ({selectedCategory.name})</h2>
          <div className="flex overflow-x-auto space-x-6 p-4 -m-4">
            {filteredTypes.length > 0 ? (
              filteredTypes.map((type) => (
                <div
                  key={type.id}
                  className={`flex-shrink-0 w-40 h-40 bg-gray-100 rounded-lg shadow-md overflow-hidden flex items-center justify-center text-center text-lg font-medium transition-transform transform hover:scale-105 duration-200 cursor-pointer border-2 ${
                    selectedType?.id === type.id ? 'border-blue-500 text-blue-800' : 'border-gray-300 text-gray-700'
                  }`}
                  onClick={() => handleTypeSelect(type)}
                >
                  {type.name}
                </div>
              ))
            ) : (
              <p className="text-gray-600">Nenhum tipo de roupa disponível para esta repartição.</p>
            )}
          </div>
        </div>
      )}

      {/* Seção Carrossel de Subtipos */}
      {selectedType && filteredSubtypes.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Selecione o Subtipo ({selectedType.name})</h2>
          <div className="flex overflow-x-auto space-x-6 p-4 -m-4">
            {filteredSubtypes.map((subtype) => (
              <div
                key={subtype.id}
                className={`flex-shrink-0 w-40 h-40 bg-gray-100 rounded-lg shadow-md overflow-hidden flex items-center justify-center text-center text-lg font-medium transition-transform transform hover:scale-105 duration-200 cursor-pointer border-2 ${
                  selectedSubtype?.id === subtype.id ? 'border-blue-500 text-blue-800' : 'border-gray-300 text-gray-700'
                }`}
                onClick={() => handleSubtypeSelect(subtype)}
              >
                {subtype.name}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Seção Botão Continuar */}
      {selectedCategory && selectedType && selectedSubtype && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleContinue}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Continuar para Edição
          </button>
        </div>
      )}
    </div>
  );
};

export default DesignCreator; 