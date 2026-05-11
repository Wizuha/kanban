import Colonne from "../models/Colonne.js";

const colonneRepository = {
  findAll: async () => {
    return await Colonne.findAll();
  },
  findById: async (id) => {
    return await Colonne.findByPk(id);
  },
  findByIntitule: async (intitule) => {
    return await Colonne.findOne({ where: { intitule } });
  },
  create: async (data) => {
    return await Colonne.create(data);
  },
};

export default colonneRepository;
