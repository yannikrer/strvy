import {
  IonPage,
  IonContent,
  IonText,
  IonInput,
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { pencil } from 'ionicons/icons';
import { useState } from 'react';
import { logout, getCurrentUser } from '../utils/auth';
import { useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Profil.css';

const Profil: React.FC = () => {
  const history = useHistory();
  const user = getCurrentUser();

  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState(user?.password || '');

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  const handleSave = () => {
    alert('Daten gespeichert (Demo)');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="profil-page">
        <Navbar />

        <div className="content-offset">
          <IonText className="profil-title">
            <h2>Anmeldedaten</h2>
          </IonText>

          <IonItem className="input-item">
            <IonLabel position="stacked">E-Mail</IonLabel>
            <div className="input-with-icon">
              <IonInput
                className="profil-input"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
              <IonIcon icon={pencil} className="edit-icon" />
            </div>
          </IonItem>

          <IonItem className="input-item">
            <IonLabel position="stacked">Password</IonLabel>
            <div className="input-with-icon">
              <IonInput
                className="profil-input"
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonIcon icon={pencil} className="edit-icon" />
            </div>
          </IonItem>

          <div className="button-row">
            <IonButton expand="block" className="logout-btn" onClick={handleLogout}>
              Abmelden
            </IonButton>
            <IonButton expand="block" className="save-btn" onClick={handleSave}>
              Speichern
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Profil;
