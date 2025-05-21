import React, { useState } from 'react';

const ClothingConfig = ({ clothingType, onConfigChange }) => {
  const [config, setConfig] = useState({
    primaryColor: '',
    fabricType: '',
    size: '',
    measurements: {
      length: '',
      width: '',
      height: '',
    },
    additionalNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      [name]: value,
    }));
    onConfigChange({ ...config, [name]: value });
  };

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setConfig((prev) => ({
      ...prev,
      measurements: {
        ...prev.measurements,
        [name]: value,
      },
    }));
    onConfigChange({
      ...config,
      measurements: {
        ...config.measurements,
        [name]: value,
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Configuração da Peça</h2>
      
      <div className="space-y-4">
        {/* Cor Primária */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cor Primária
          </label>
          <input
            type="color"
            name="primaryColor"
            value={config.primaryColor}
            onChange={handleChange}
            className="w-full h-10 rounded-lg border border-gray-300"
          />
        </div>

        {/* Tipo de Tecido */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Tecido
          </label>
          <select
            name="fabricType"
            value={config.fabricType}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Selecione o tipo de tecido</option>
            <option value="algodao">Algodão</option>
            <option value="poliester">Poliéster</option>
            <option value="jeans">Jeans</option>
            <option value="malha">Malha</option>
            <option value="seda">Seda</option>
          </select>
        </div>

        {/* Tamanho */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tamanho
          </label>
          <select
            name="size"
            value={config.size}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Selecione o tamanho</option>
            <option value="PP">PP</option>
            <option value="P">P</option>
            <option value="M">M</option>
            <option value="G">G</option>
            <option value="GG">GG</option>
            <option value="XG">XG</option>
          </select>
        </div>

        {/* Medidas */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medidas (cm)
          </label>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Comprimento</label>
              <input
                type="number"
                name="length"
                value={config.measurements.length}
                onChange={handleMeasurementChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Comprimento"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Largura</label>
              <input
                type="number"
                name="width"
                value={config.measurements.width}
                onChange={handleMeasurementChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Largura"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Altura</label>
              <input
                type="number"
                name="height"
                value={config.measurements.height}
                onChange={handleMeasurementChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                placeholder="Altura"
              />
            </div>
          </div>
        </div>

        {/* Observações Adicionais */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Observações Adicionais
          </label>
          <textarea
            name="additionalNotes"
            value={config.additionalNotes}
            onChange={handleChange}
            rows="3"
            className="w-full rounded-lg border border-gray-300 px-3 py-2"
            placeholder="Adicione observações importantes sobre a peça..."
          />
        </div>
      </div>
    </div>
  );
};

export default ClothingConfig; 