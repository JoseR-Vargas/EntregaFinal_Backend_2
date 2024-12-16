import fs from "fs";
import crypto from "crypto"

class ProductsManager {
  constructor() {
    this.path = "./src/dao/fs/files/products.json";
    this.init();
  }
  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      const stringData = JSON.stringify([], null, 2);
      fs.writeFileSync(this.path, stringData);
    }
  }

  async create(data) {
    try {
      if (!data.title || !data.description) {
        throw new Error("INGRESE TITULO/DESCRIPCION");
      }
  
      this.title = data.title;
  
      // Verificar si el archivo existe y está inicializado
      let all = [];
      try {
        const fileContent = await fs.promises.readFile(this.path, "utf-8");
        all = fileContent ? JSON.parse(fileContent) : [];
      } catch (err) {
        if (err.code === 'ENOENT') {
          // Si el archivo no existe, inicializamos con un array vacío
          all = [];
        } else {
          throw err; // Si es otro error, lo lanzamos
        }
      }
  
      // Agregar el nuevo producto
      all.push(data);
  
      // Escribir los datos actualizados en el archivo
      const jsonData = JSON.stringify(all, null, 2);
      await fs.promises.writeFile(this.path, jsonData);
  
      return data;
    } catch (error) {
      throw error;
    }
  }
  // async create(data) {
  //   try {
  //     if (!data.title || !data.description) {
  //       throw new Error("INGRESE TITULO/DESCRIPCION");
  //     } else {
  //       this.title = data.title;
  //       let all = await fs.promises.readFile(this.path, "utf-8");
  //       all = JSON.parse(all);
  //       all.push(data);
  //       all = JSON.stringify(all, null, 2);
  //       await fs.promises.writeFile(this.path, all);
  //       return data;
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async read(filter) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      return all;
    } catch (error) {
      throw error;
    }
  }
  async readOne(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each._id === id);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      let all = await this.read();
      let one = all.find((each) => each._id === id);
      if (one) {
        for (let prop in data) {
          one[prop] = data[prop];
        }
        all = JSON.stringify(all, null, 2);
        await fs.promises.writeFile(this.path, all);
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      let all = await fs.promises.readFile(this.path, "utf-8");
      all = JSON.parse(all);
      let one = all.find((each) => each._id === id);
      if (one) {
        let filtered = all.filter((each) => each._id !== id);
        filtered = JSON.stringify(filtered, null, 2);
        await fs.promises.writeFile(this.path, filtered);
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
}

const productsManager = new ProductsManager();
export default productsManager;

