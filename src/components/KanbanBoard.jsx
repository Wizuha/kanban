import { useEffect, useState } from "react";

function KanbanBoard() {
  const [taches, setTaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [couleur, setCouleur] = useState("FF0000");
  const [formError, setFormError] = useState(null);

  const fetchTaches = () => {
    fetch("/api/taches")
      .then((res) => res.json())
      .then((data) => {
        setTaches(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTaches();
  }, []);

  const handleSubmit = async () => {
    setFormError(null);

    // Retire le # si l'utilisateur l'a tapé
    const couleurSansHash = couleur.replace("#", "");

    const res = await fetch("/api/taches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, couleur: couleurSansHash }),
    });

    if (!res.ok) {
      const data = await res.json();
      setFormError(data.message || "Erreur lors de la création");
      return;
    }

    // Réinitialise le formulaire et recharge les tâches
    setNom("");
    setCouleur("FF0000");
    setShowForm(false);
    fetchTaches();
  };

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
        <button
          className="btn btn-primary btn-sm"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Annuler" : "+ Nouvelle tâche"}
        </button>
      </div>

      {/* Formulaire d'ajout */}
      {showForm && (
        <div className="card p-3 mb-4">
          <h2 className="h6 mb-3">Nouvelle tâche</h2>
          {formError && <p className="text-danger small">{formError}</p>}
          <div className="mb-2">
            <label className="form-label small">Nom de la tâche</label>
            <input
              type="text"
              className="form-control form-control-sm"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Découpe moule A3"
            />
          </div>
          <div className="mb-3">
            <label className="form-label small">
              Couleur (hex sans #, ex: FF0000)
            </label>
            <div className="d-flex align-items-center gap-2">
              <input
                type="text"
                className="form-control form-control-sm"
                value={couleur}
                onChange={(e) => setCouleur(e.target.value)}
                placeholder="FF0000"
                maxLength={6}
              />
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: `#${couleur}`,
                  border: "1px solid #ccc",
                  flexShrink: 0,
                }}
              />
            </div>
          </div>
          <button className="btn btn-success btn-sm" onClick={handleSubmit}>
            Ajouter
          </button>
        </div>
      )}

      {/* Colonnes */}
      <div className="row">
        {Object.entries(colonnes).map(([intitule, tachesColonne]) => (
          <div key={intitule} className="col">
            <div className="bg-light border rounded p-3 h-100">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="fw-bold text-uppercase small">{intitule}</span>
                <span className="badge bg-secondary">
                  {tachesColonne.length}
                </span>
              </div>
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
