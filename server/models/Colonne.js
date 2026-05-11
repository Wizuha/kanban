import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Colonne = sequelize.define(
  "Colonne",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    intitule: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "colonne",
    timestamps: false,
  }
);

export default Colonne;
