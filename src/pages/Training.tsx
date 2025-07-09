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
import type { Training as TrainingType } from '../data/trainings';
import { getTrainings, deleteTraining } from '../data/trainings';
import './Training.css';
import { useHistory } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import { useState } from 'react';

const Training: React.FC = () => {
  const [trainings, setTrainings] = useState<TrainingType[]>([]);
  const history = useHistory();

  useIonViewWillEnter(() => {
    const data = getTrainings();
    setTrainings(data);
  });

  const handleDelete = (id: string) => {
    const confirm = window.confirm('Training wirklich löschen?');
    if (!confirm) return;

    deleteTraining(id);
    setTrainings(getTrainings());
  };

  return (
    <IonPage>
      <IonContent fullscreen className="training-page">
        <div className="content-offset">
          {trainings.length === 0 ? (
            <IonText className="no-data">Keine Trainings gefunden.</IonText>
          ) : (
            trainings.map((t) => (
              <div className="training-card" key={t.id}>
                <div className="training-header">
                  <div className="training-title-group">
                    <span
                      className="training-color"
                      style={{ backgroundColor: t.farbe }}
                      title="Farbe des Trainings"
                    />
                    <IonText className="training-title">{t.name}</IonText>
                  </div>

                  <div className="training-actions">
                    <IonIcon
                      icon={pencil}
                      className="icon-btn"
                      onClick={() => history.push(`/training-bearbeiten/${t.id}`)}
                      title="Bearbeiten"
                    />
                    <IonIcon
                      icon={trash}
                      className="icon-btn"
                      onClick={() => handleDelete(t.id)}
                      title="Löschen"
                    />
                  </div>
                </div>

                <div className="training-info">
                  <IonText>Anzahl Übungen: {t.uebungen.length}</IonText>
                </div>
                <IonText className="training-date">
                  Erstelldatum: {t.createdAt}
                </IonText>
              </div>
            ))
          )}
        </div>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => history.push('/training-erstellen')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>

      {/* Fixierte untere Navigation */}
      <Navbar />
    </IonPage>
  );
};

export default Training;
