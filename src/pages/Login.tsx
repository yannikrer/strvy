import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonText,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { login, isLoggedIn } from '../utils/auth';
import './Login.css';

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError(true);
      return;
    }

    const success = login(email.trim(), password.trim());
    if (success) {
      setError(false);
      history.replace('/home');
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (isLoggedIn()) {
      history.replace('/home');
    }
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen className="login-page">
        <div className="login-container">
          <img src="./logo.png" alt="STRYV Logo" className="login-logo" />

          <IonInput
            className="custom-input"
            placeholder="E-Mail"
            type="email"
            value={email}
            onIonChange={(e) => setEmail(e.detail.value!)}
          />
          <IonInput
            className="custom-input"
            placeholder="Password"
            type="password"
            value={password}
            onIonChange={(e) => setPassword(e.detail.value!)}
          />

          <IonButton expand="block" className="login-button" onClick={handleLogin}>
            Log in
          </IonButton>

          {error && (
            <IonText color="danger" className="error-text">
              <p>Falsche E-Mail oder Passwort</p>
            </IonText>
          )}

          <IonText className="signup-text">
            Don’t have an account? <strong>Sign up</strong>
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
