import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import KanbanBoard from "../components/KanbanBoard";

beforeEach(() => {
  globalThis.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: 1,
            nom: "Découpe moule A3",
            couleur: "E24B4A",
            colonne: { id: 1, intitule: "A Faire" },
          },
          {
            id: 2,
            nom: "Injection série B",
            couleur: "1D9E75",
            colonne: { id: 2, intitule: "En Cours" },
          },
        ]),
    }),
  ) as unknown as typeof fetch;
}); // ← parenthèse fermante manquante

afterEach(() => {
  vi.restoreAllMocks();
});

describe("KanbanBoard", () => {
  it("affiche le titre du tableau", async () => {
    render(<KanbanBoard />);
    await waitFor(() => {
      expect(screen.getByText("Tableau Kanban — Jaydee")).toBeInTheDocument();
    });
  });

  it("affiche les colonnes après chargement", async () => {
    render(<KanbanBoard />);
    await waitFor(() => {
      expect(screen.getByText("A Faire")).toBeInTheDocument();
      expect(screen.getByText("En Cours")).toBeInTheDocument();
    });
  });

  it("affiche les tâches dans leur colonne", async () => {
    render(<KanbanBoard />);
    await waitFor(() => {
      expect(screen.getByText("Découpe moule A3")).toBeInTheDocument();
      expect(screen.getByText("Injection série B")).toBeInTheDocument();
    });
  });
});
