import { useEffect, useState } from "react";

function KanbanBoard() {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/api/taches")
      .then((res) => res.json())
      .then((data) => {
        setTaches(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Chargement...</p>;
  if (error) return <p className="text-center mt-5 text-danger">{error}</p>;

  const colonnes = taches.reduce((acc, tache) => {
    const intitule = tache.colonne.intitule;
    if (!acc[intitule]) acc[intitule] = [];
    acc[intitule].push(tache);
    return acc;
  }, {});

  return (
    <div className="container-fluid p-4">
      {/* Navbar */}
      <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light border rounded">
        <h1 className="h5 mb-0">Tableau Kanban — Jaydee</h1>
        <button className="btn btn-primary btn-sm">+ Nouvelle tâche</button>
      </div>

      {/* Colonnes */}
      <div className="row">
        {Object.entries(colonnes).map(([intitule, tachesColonne]) => (
          <div key={intitule} className="col">
            <div className="bg-light border rounded p-3 h-100">
              {/* Titre colonne */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold text-uppercase small">{intitule}</span>
                <span className="badge bg-secondary">
                  {tachesColonne.length}
                </span>
              </div>

              {/* Cartes tâches */}
              {tachesColonne.map((tache) => (
                <div key={tache.id} className="card mb-2 p-2">
                  <div className="d-flex align-items-center gap-2">
                    <div
                      style={{
                        width: "12px",
                        height: "12px",
                        borderRadius: "50%",
                        backgroundColor: `#${tache.couleur}`,
                        flexShrink: 0,
                      }}
                    />
                    <span className="small">{tache.nom}</span>
                  </div>
                </div>
              ))}

              {/* Lien ajouter */}
              <button className="btn btn-link btn-sm text-muted p-0 mt-2">
                + Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
