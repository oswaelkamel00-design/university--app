import { useState } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import StudentCard from './components/StudentCard.jsx';
import StudentForm from './StudentForm.jsx'; 
import Footer from './components/Footer.jsx';

import avatarImg from './assets/215.png';
import avatarImg1 from './assets/slim.png';
import avatarImg2 from './assets/sarra.png';
import avatarImg3 from './assets/meriam.png';

function App() {
  const [information, setInformation] = useState([
    { id: 1, nomprenom: 'lyna brahim', email: 'lynabrahim00@gmail.com', tel: '+216 54 159 753', filiere: "Génie Logiciel et Système d'information", ann: '2', groupe: 'GLSI 2', ville: 'Mahdia', photo: avatarImg },
    { id: 2, nomprenom: 'Slim Boubaker', email: 'slimboubaker@gmail.com', tel: '+216 26 548 965', filiere: "Génie Logiciel et Système d'information", ann: '2', groupe: 'GLSI 2', ville: 'Mahdia', photo: avatarImg1 },
    { id: 3, nomprenom: 'Sarra Trabelsi', email: 'sarratrabelsi@gmail.com', tel: '+216 22 365 741', filiere: "Génie Logiciel et Système d'information", ann: '2', groupe: 'GLSI 2', ville: 'Sousse', photo: avatarImg2 },
    { id: 4, nomprenom: 'Meriam Khalfallah', email: 'meriamkhalfallah@gmail.com', tel: '+216 99 568 475', filiere: "Génie Logiciel et Système d'information", ann: '2', groupe: 'GLSI 2', ville: 'Sfax', photo: avatarImg3 },
  ]);

  const [recherche, setRecherche] = useState("");
  const [afficherFormulaire, setAfficherFormulaire] = useState(false);

  function ajouterEtudiant(nouvelEtudiant) {
    const etudiantAvecId = { ...nouvelEtudiant, id: Date.now() };
    setInformation([...information, etudiantAvecId]);
    setAfficherFormulaire(false); 
  }

  function supprimerEtudiant(id) {
    setInformation(information.filter(student => student.id !== id));
  }

  function modifierEtudiant(id, updatedData) {
    setInformation(prev => prev.map(student => 
      student.id === id ? { ...student, ...updatedData } : student
    ));
  }

  const etudiantsFiltres = information.filter(student => 
    student.nomprenom.toLowerCase().includes(recherche.toLowerCase()) ||
    student.filiere.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <Navbar />
      
      <div className='actions' style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Rechercher par nom ou filière..." 
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="search-input" 
        />
        <button onClick={() => setAfficherFormulaire(!afficherFormulaire)}>
          {afficherFormulaire ? "Annuler" : "+ Ajouter un étudiant"}
        </button>
      </div>

      {afficherFormulaire && <StudentForm onAjouter={ajouterEtudiant} />}

      <main className="main-content">
        <h1 className="page-title">Liste des étudiants</h1>
        <div className="container">
          {etudiantsFiltres.map((student) => (
            <StudentCard
              key={student.id}
              id={student.id} 
              nomprenom={student.nomprenom}
              email={student.email}
              tel={student.tel}
              filiere={student.filiere}
              ann={student.ann}
              group={student.groupe}
              ville={student.ville}
              photo={student.photo}
              onSupprimer={supprimerEtudiant} 
              onModifier={modifierEtudiant}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;