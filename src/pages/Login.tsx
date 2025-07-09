import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import logo from './logo.png';
import { login, isLoggedIn } from '../utils/auth'; // <== NUTZEN!

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isLoggedIn()) {
      history.replace('/home');
    }
  }, [history]);

  const handleLogin = () => {
    const success = login(email.trim(), password.trim());
    if (success) {
      setError('');
      history.replace('/home');
    } else {
      setError('Benutzername oder Passwort ist falsch.');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="login-page">
        <div className="login-container">
          <img src={logo} alt="STRYV Logo" className="login-logo" />
          <h1 className="title">Willkommen zurück</h1>

          <IonInput
            className="custom-input"
            placeholder="Benutzername"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
          <IonInput
            className="custom-input"
            placeholder="Passwort"
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />

          {error && (
            <IonText color="danger" className="error-text">
              {error}
            </IonText>
          )}

          <IonButton expand="block" className="login-button" onClick={handleLogin}>
            Anmelden
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
