import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Colonne from "./Colonne.js";

const Tache = sequelize.define(
  "Tache",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Le nom de la tâche ne peut pas être vide",
        },
        notNull: {
          msg: "Le nom de la tâche est obligatoire",
        },
      },
    },
    couleur: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: {
          args: /^[0-9A-Fa-f]{6}$/,
          msg: "La couleur doit être une valeur hexadécimale RGB sans dièse (ex: FF0000)",
        },
      },
    },
    colonneId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "colonne",
        key: "id",
      },
    },
  },
  {
    tableName: "tache",
    timestamps: false,
  }
);

Tache.belongsTo(Colonne, { foreignKey: "colonneId", as: "colonne" });
Colonne.hasMany(Tache, { foreignKey: "colonneId", as: "taches" });

export default Tache;
