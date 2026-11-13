import { useState } from "react";
import './StudentCard.css';

function StudentCard({ id, photo, nomprenom, email, tel, filiere, ann, group, ville, onSupprimer, onModifier }) {
  const [cordonneesVisibles, setCordonneesVisibles] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ nomprenom, email, tel, filiere, ann, groupe: group, ville });

  const startEditing = () => {
    setForm({ nomprenom, email, tel, filiere, ann, groupe: group, ville });
    setIsEditing(true);
  };

  const handleChange = (champ) => (e) => {
    setForm({ ...form, [champ]: e.target.value });
  };

  const handleSave = () => {
    onModifier(id, form);
    setIsEditing(false);
  };

  return (
    <article className="card">
      <img src={photo} alt={nomprenom} className="pho" />
      <h2 className="card-title">Fiche étudiant</h2>

      {isEditing ? (
        <div className="edit-form">
          <input type="text" value={form.nomprenom} onChange={handleChange("nomprenom")} placeholder="Nom et prénom" />
          <input type="email" value={form.email} onChange={handleChange("email")} placeholder="Email" />
          <input type="tel" value={form.tel} onChange={handleChange("tel")} placeholder="Téléphone" />
          <input type="text" value={form.filiere} onChange={handleChange("filiere")} placeholder="Filière" />
          <input type="text" value={form.ann} onChange={handleChange("ann")} placeholder="Année" />
          <input type="text" value={form.groupe} onChange={handleChange("groupe")} placeholder="Groupe" />
          <input type="text" value={form.ville} onChange={handleChange("ville")} placeholder="Ville" />
          <button className="btn-save" onClick={handleSave}>ENREGISTRER</button>
          <button className="btn-cancel" onClick={() => setIsEditing(false)}>ANNULER</button>
        </div>
      ) : (
        <>
          <div className="student-info">
            <p><strong>Nom :</strong> {nomprenom}</p>
            {cordonneesVisibles && (
              <>
                <p><strong>Email :</strong> {email}</p>
                <p><strong>Tél :</strong> {tel}</p>
              </>
            )}
            <p><strong>Filière :</strong> {filiere}</p>
            <p><strong>Année :</strong> {ann}</p>
            <p><strong>Groupe :</strong> {group}</p>
            <p><strong>Ville :</strong> {ville}</p>
          </div>

          <div className="card-actions">
            <button onClick={() => alert(`Contactez ${nomprenom} à ${email} ou ${tel}`)} className="btn-contact">Contact</button>
            <button onClick={startEditing} className="btn-modify">Modifier</button>
            <button onClick={() => onSupprimer(id)} className="btn-delete">Supprimer</button>
            <button onClick={() => setCordonneesVisibles(!cordonneesVisibles)} className="btn-affiche">
              {cordonneesVisibles ? "Masquer" : "Afficher"}
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default StudentCard;