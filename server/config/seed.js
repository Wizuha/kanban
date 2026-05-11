import sequelize from "./db.js";
import Colonne from "../models/Colonne.js";
import Tache from "../models/Tache.js";

await sequelize.sync({ force: true });

await Colonne.bulkCreate([
  { intitule: "A Faire" },
  { intitule: "En Cours" },
  { intitule: "A Controler" },
  { intitule: "Termine" },
]);

await Tache.bulkCreate([
  { nom: "Découpe moule A3", couleur: "E24B4A", colonneId: 1 },
  { nom: "Réglage presse 2", couleur: "EF9F27", colonneId: 1 },
  { nom: "Injection série B", couleur: "1D9E75", colonneId: 2 },
  { nom: "Contrôle qualité lot 7", couleur: "7F77DD", colonneId: 3 },
  { nom: "Éjection pièces A2", couleur: "378ADD", colonneId: 4 },
]);

console.log("Base de données alimentée avec succès");
process.exit(0);
