import { IonIcon, IonText } from '@ionic/react';
import { NavLink } from 'react-router-dom';
import { home, stopwatch, barbell, person } from 'ionicons/icons';
import './Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <NavLink to="/home" className="nav-link" activeClassName="active">
        <IonIcon icon={home} className="nav-icon" />
      </NavLink>
      <NavLink to="/training" className="nav-link" activeClassName="active">
        <IonIcon icon={stopwatch} className="nav-icon" />
      </NavLink>
      <IonText className="nav-logo">STRYV</IonText>
      <NavLink to="/uebungen" className="nav-link" activeClassName="active">
        <IonIcon icon={barbell} className="nav-icon" />
      </NavLink>
      <NavLink to="/profil" className="nav-link" activeClassName="active">
        <IonIcon icon={person} className="nav-icon" />
      </NavLink>
    </div>
  );
};

export default Navbar;
