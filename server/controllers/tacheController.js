import tacheRepository from "../repositories/tacheRepository.js";
import colonneRepository from "../repositories/colonneRepository.js";

const tacheController = {
  getAll: async (req, res) => {
    try {
      const taches = await tacheRepository.findAll();
      res.json(taches);
    } catch (error) {
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const { nom, couleur } = req.body;

      const colonne = await colonneRepository.findByIntitule("A Faire");
      if (!colonne) {
        return res
          .status(400)
          .json({ message: 'La colonne "A Faire" n\'existe pas' });
      }

      const tache = await tacheRepository.create({
        nom,
        couleur,
        colonneId: colonne.dataValues.id,
      });

      const tacheAvecColonne = await tacheRepository.findById(
        tache.dataValues.id
      );
      res.status(201).json(tacheAvecColonne);
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({
          message: "Données invalides",
          errors: error.errors.map((e) => e.message),
        });
      }
      res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
  },
};

export default tacheController;
