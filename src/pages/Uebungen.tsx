import {
  IonPage,
  IonContent,
  IonText,
  IonIcon,
  IonFab,
  IonFabButton,
} from '@ionic/react';
import { pencil, trash, add } from 'ionicons/icons';
import Navbar from '../components/Navbar';
import { getUebungen, deleteUebung, Uebung } from '../data/uebungen';
import './Uebungen.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';

const Uebungen: React.FC = () => {
  const [uebungen, setUebungen] = useState<Uebung[]>([]);
  const history = useHistory();

  useIonViewWillEnter(() => {
    loadUebungen();
  });

  const loadUebungen = () => {
    try {
      const data = getUebungen();
      setUebungen(data);
    } catch (err) {
      console.error('Fehler beim Laden der Übungen:', err);
      alert('Fehler beim Laden. Details siehe Konsole (F12).');
    }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Möchtest du diese Übung wirklich löschen?')) {
      deleteUebung(id);
      loadUebungen();
    }
  };

  const handleEdit = (id: string) => {
    history.push(`/uebung-bearbeiten/${id}`);
  };

  return (
    <IonPage>
      <IonContent fullscreen className="uebungen-page">
        <Navbar />
        <div className="content-offset">
          {uebungen.length === 0 ? (
            <IonText className="no-data">Keine Übungen gefunden.</IonText>
          ) : (
            uebungen.map((u) => (
              <div className="uebung-card" key={u.id}>
                <div className="uebung-info-wrapper">
                  <div className="uebung-text">
                    <div className="uebung-title-row">
                      <strong>{u.name}</strong>
                      <div className="uebung-actions">
                        <IonIcon icon={pencil} onClick={() => handleEdit(u.id)} />
                        <IonIcon icon={trash} onClick={() => handleDelete(u.id)} />
                      </div>
                    </div>
                    <p>Gewicht: {u.gewicht}</p>
                    <p>Erstelldatum: {u.createdAt}</p>
                  </div>
                  {u.foto && <img src={u.foto} alt={u.name} className="uebung-img" />}
                </div>
              </div>
            ))
          )}
        </div>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => history.push('/uebung-erstellen')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Uebungen;
