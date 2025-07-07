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

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    const success = login(email, password);
    if (success) {
      setError(false);
      history.replace('/home'); // <<< direkt weiterleiten
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    // Wenn man schon eingeloggt ist und auf /login geht:
    if (isLoggedIn()) {
      history.replace('/home');
    }
  }, [history]);

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding login-page">
        <div className="login-container">
          <h1 className="logo">STRYV</h1>

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
            <IonText color="danger" className="ion-text-center" style={{ marginTop: '12px' }}>
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
