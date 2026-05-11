import Tache from "../models/Tache.js";
import Colonne from "../models/Colonne.js";

const tacheRepository = {
  findAll: async () => {
    return await Tache.findAll({
      include: [{ model: Colonne, as: "colonne" }],
    });
  },
  findById: async (id) => {
    return await Tache.findByPk(id, {
      include: [{ model: Colonne, as: "colonne" }],
    });
  },
  create: async (data) => {
    return await Tache.create(data);
  },
};

export default tacheRepository;
