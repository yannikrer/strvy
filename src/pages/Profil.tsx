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
import { pencil, checkmark } from 'ionicons/icons';
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
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  const handleSave = () => {
    alert('Daten gespeichert (Demo)');
    setEditingEmail(false);
    setEditingPassword(false);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="profil-page">
        <Navbar />
        <div className="content-offset">
          <IonText className="profil-title">
            <h2>Profil & Zugangsdaten</h2>
          </IonText>

          <IonItem className="input-item">
            <IonLabel position="stacked">E-Mail</IonLabel>
            <div className="input-with-icon">
              <IonInput
                className="profil-input"
                value={email}
                disabled={!editingEmail}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
              <IonIcon
                icon={editingEmail ? checkmark : pencil}
                className="edit-icon"
                onClick={() => setEditingEmail(!editingEmail)}
              />
            </div>
          </IonItem>

          <IonItem className="input-item">
            <IonLabel position="stacked">Passwort</IonLabel>
            <div className="input-with-icon">
              <IonInput
                className="profil-input"
                type="password"
                value={password}
                disabled={!editingPassword}
                onIonChange={(e) => setPassword(e.detail.value!)}
              />
              <IonIcon
                icon={editingPassword ? checkmark : pencil}
                className="edit-icon"
                onClick={() => setEditingPassword(!editingPassword)}
              />
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
