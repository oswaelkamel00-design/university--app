import { useState } from 'react';
import './StudentForm.css';
import defaultAvatar from './assets/60.png'

function StudentForm({ onAjouter }) {
  const [nomprenom, setNomprenom] = useState('');
  const [email, setEmail] = useState('');
  const [tel, setTel] = useState('');
  const [filiere, setFiliere] = useState(''); 
  const [ann, setAnn] = useState('');         
  const [groupe, setGroupe] = useState('');
  const [ville, setVille] = useState('');
  const [photo, setPhoto] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');

  const handleFileChange = (e) => {
    const fichier = e.target.files[0];
    if (fichier) {
      setPhoto(fichier);
      setPhotoPreview(URL.createObjectURL(fichier));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const nouvelEtudiant = {
      nomprenom,
      email,
      tel,
      filiere,
      ann,
      groupe,
      ville,
      photo: photoPreview || defaultAvatar, 
    };

    onAjouter(nouvelEtudiant);
    setNomprenom('');
    setEmail('');
    setTel('');
    setFiliere('');
    setAnn('');
    setGroupe('');
    setVille('');
    setPhoto(null);
    setPhotoPreview('');
    e.target.reset(); 
  };

  return (
    <form className="student-form" onSubmit={handleSubmit}>
      <h2>Ajouter un étudiant</h2>
      
      <label for="nomprenom">Nom et Prénom :</label>
      <input type="text" id="nomprenom" value={nomprenom} onChange={(e) => setNomprenom(e.target.value)} required />

      <label for="email">Email :</label>
      <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      <label for="tel">Téléphone :</label>
      <input type="tel" id="tel" value={tel} onChange={(e) => setTel(e.target.value)} required />

      <label for="filiere">Filière :</label>
      <select id="filiere" value={filiere} onChange={(e) => setFiliere(e.target.value)} required>
        <option value="">-- Choisir une filière --</option>
        <option value="Génie Logiciel et Système d'information">Génie Logiciel et Système d'information</option>
        <option value="Multimédia">Multimédia</option>
        <option value="Réseaux et Télécommunications">Réseaux et Télécommunications</option>
      </select>

      <label for="ann">Année d'étude :</label>
      <select id="ann" value={ann} onChange={(e) => setAnn(e.target.value)} required>
        <option value="">-- Choisir une année --</option>
        <option value="1">1ère année</option>
        <option value="2">2ème année</option>
        <option value="3">3ème année</option>
      </select>

      <label for="groupe">Groupe :</label>
      <input type="text" id="groupe" value={groupe} onChange={(e) => setGroupe(e.target.value)} required placeholder="ex: GLSI 2" />

      <label for="ville">Ville :</label>
      <input type="text" id="ville" value={ville} onChange={(e) => setVille(e.target.value)} required />

      <label for="photo">Photo (optionnel) :</label>
      <input type="file" id="photo" accept="image/*" onChange={handleFileChange} />
      {photoPreview && <img src={photoPreview} alt="Aperçu" className="photo-preview" />}

      <button type="submit" className="btn-submit">Ajouter l'étudiant</button>
    </form>
  );
}

export default StudentForm;