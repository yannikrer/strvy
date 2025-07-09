import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useState, useEffect } from 'react';
import { isLoggedIn } from './utils/auth';

import Home from './pages/Home';
import Login from './pages/Login';
import Training from './pages/Training';
import Uebungen from './pages/Uebungen';
import Profil from './pages/Profil';
import UebungErstellen from './pages/UebungErstellen';
import UebungBearbeiten from './pages/UebungBearbeiten';
import TrainingErstellen from './pages/TrainingErstellen';
import TrainingBearbeiten from './pages/TrainingBearbeiten';
import WochenplanBearbeiten from './pages/WochenplanBearbeiten';
import Kalorien from './pages/Kalorien'; // ✅ importieren



/* Ionic CSS */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import TrainingAusfuehren from './pages/TrainingAusfuehren';


import './theme/login.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(isLoggedIn());

  useEffect(() => {
    const onAuthChanged = () => setAuthenticated(isLoggedIn());
    window.addEventListener('authChanged', onAuthChanged);
    return () => window.removeEventListener('authChanged', onAuthChanged);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Login (öffentlich) */}
          <Route exact path="/login">
            {!authenticated ? <Login /> : <Redirect to="/home" />}
          </Route>

          {/* Geschützte Routen */}
          <Route exact path="/home">
            {authenticated ? <Home /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/uebungen">
            {authenticated ? <Uebungen /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/profil">
            {authenticated ? <Profil /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/uebung-erstellen">
            {authenticated ? <UebungErstellen /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/uebung-bearbeiten/:id">
            {authenticated ? <UebungBearbeiten /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/training">
            {authenticated ? <Training /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/training-erstellen">
            {authenticated ? <TrainingErstellen /> : <Redirect to="/login" />}
          </Route>

          <Route exact path="/training-bearbeiten/:id">
            {authenticated ? <TrainingBearbeiten /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/wochenplan">
            {authenticated ? <WochenplanBearbeiten /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/training-ausfuehren/:id">
            {authenticated ? <TrainingAusfuehren /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/kalorien">
            {authenticated ? <Kalorien /> : <Redirect to="/login" />}
          </Route>


          {/* Standard-Redirect */}
          <Route exact path="/">
            <Redirect to={authenticated ? '/home' : '/login'} />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
