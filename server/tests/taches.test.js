import request from "supertest";
import express from "express";
import cors from "cors";
import sequelize from "../config/db.js";
import tachesRouter from "../routes/taches.js";
import Colonne from "../models/Colonne.js";
import { beforeAll, afterAll, describe, it, expect } from "@jest/globals";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/taches", tachesRouter);

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Colonne.create({ intitule: "A Faire" });
});

afterAll(async () => {
  await sequelize.close();
});

// Test Q8 — GET /api/taches
describe("GET /api/taches", () => {
  it("doit retourner un tableau JSON", async () => {
    const res = await request(app).get("/api/taches");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Test Q9 — POST /api/taches
describe("POST /api/taches", () => {
  it("doit créer une tâche dans la colonne A Faire", async () => {
    const res = await request(app)
      .post("/api/taches")
      .send({ nom: "Test tâche", couleur: "FF0000" });
    expect(res.status).toBe(201);
    expect(res.body.nom).toBe("Test tâche");
    expect(res.body.colonne.intitule).toBe("A Faire");
  });

  it("doit retourner 400 si la couleur est invalide", async () => {
    const res = await request(app)
      .post("/api/taches")
      .send({ nom: "Test", couleur: "ZZZZZZ" });
    expect(res.status).toBe(400);
  });

  it("doit retourner 400 si le nom est vide", async () => {
    const res = await request(app)
      .post("/api/taches")
      .send({ nom: "", couleur: "FF0000" });
    expect(res.status).toBe(400);
  });
});
