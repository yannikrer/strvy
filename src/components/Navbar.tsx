import { useState } from 'react';
import { IonIcon } from '@ionic/react';
import { NavLink } from 'react-router-dom';
import { home, stopwatch, barbell, person, menu } from 'ionicons/icons';
import './Navbar.css';
import logo from './logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`navbar-floating-container ${isOpen ? 'open' : ''}`}>
      <div className={`navbar ${isOpen ? 'expanded' : ''}`}>
        {isOpen ? (
          <>
            <NavLink to="/home" className="nav-link" activeClassName="active">
              <IonIcon icon={home} className="nav-icon" />
            </NavLink>
            <NavLink to="/training" className="nav-link" activeClassName="active">
              <IonIcon icon={stopwatch} className="nav-icon" />
            </NavLink>

            <div className="nav-logo">
              <img src={logo} alt="Logo" />
            </div>

            <NavLink to="/uebungen" className="nav-link" activeClassName="active">
              <IonIcon icon={barbell} className="nav-icon" />
            </NavLink>
            <NavLink to="/profil" className="nav-link" activeClassName="active">
              <IonIcon icon={person} className="nav-icon" />
            </NavLink>

            <button className="nav-toggle-btn" onClick={() => setIsOpen(false)}>
              &times;
            </button>
          </>
        ) : (
          <button className="nav-toggle-btn" onClick={() => setIsOpen(true)}>
            <IonIcon icon={menu} className="hamburger-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
