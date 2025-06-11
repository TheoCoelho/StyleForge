import * as THREE from 'three';

class TextureManager {
  constructor() {
    this.textures = new Map();
    this.loadingTextures = new Map();
  }

  // Carregar uma textura
  async loadTexture(url, options = {}) {
    if (this.textures.has(url)) {
      return this.textures.get(url);
    }

    if (this.loadingTextures.has(url)) {
      return this.loadingTextures.get(url);
    }

    const loadingPromise = new Promise((resolve, reject) => {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.load(
        url,
        (texture) => {
          // Configurar opções da textura
          if (options.repeat) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(options.repeat.x || 1, options.repeat.y || 1);
          }

          if (options.anisotropy) {
            texture.anisotropy = options.anisotropy;
          }

          this.textures.set(url, texture);
          this.loadingTextures.delete(url);
          resolve(texture);
        },
        undefined,
        (error) => {
          this.loadingTextures.delete(url);
          reject(error);
        }
      );
    });

    this.loadingTextures.set(url, loadingPromise);
    return loadingPromise;
  }

  // Aplicar textura a um material
  applyTextureToMaterial(material, textureUrl, options = {}) {
    return this.loadTexture(textureUrl, options).then((texture) => {
      material.map = texture;
      material.needsUpdate = true;
      return material;
    });
  }

  // Limpar texturas não utilizadas
  disposeTexture(url) {
    const texture = this.textures.get(url);
    if (texture) {
      texture.dispose();
      this.textures.delete(url);
    }
  }

  // Limpar todas as texturas
  disposeAll() {
    this.textures.forEach((texture) => texture.dispose());
    this.textures.clear();
    this.loadingTextures.clear();
  }
}

export default TextureManager; 