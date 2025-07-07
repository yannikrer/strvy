import {
  IonPage,
  IonContent,
  IonText,
  IonButton,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getTrainings, Training } from '../data/trainings';
import { getChecks, saveChecks } from '../data/checks';
import './TrainingAusfuehren.css';
import { useEffect, useState } from 'react';

const TrainingAusfuehren: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [training, setTraining] = useState<Training | undefined>(undefined);
  const [checked, setChecked] = useState<boolean[]>([]);

  // Trainingsdaten + gespeicherte Checkbox-Status laden
  useEffect(() => {
    const allTrainings = getTrainings();
    const found = allTrainings.find(t => t.id === id);
    setTraining(found);

    if (found) {
      const saved = getChecks();
      const initial = saved[id] || new Array(found.uebungen.length).fill(false);
      setChecked(initial);
    }
  }, [id]);

  const toggleChecked = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  const handleSave = () => {
    if (!training) return;
    const saved = getChecks();
    saved[id] = checked;
    saveChecks(saved);
    history.goBack();
  };

  if (!training) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Navbar />
          <div className="content-offset">
            <IonText>Training nicht gefunden.</IonText>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen className="training-ausfuehren-page">
        <Navbar />
        <div className="content-offset">
          <IonText className="training-title">{training.name}</IonText>

          {training.uebungen.map((uebung, index) => (
            <div className="uebung-card" key={index}>
              <div className="uebung-info">
                <strong>{uebung.name}</strong>
                <p>Gewicht: {uebung.gewicht} kilogramm &nbsp;&nbsp;</p>
                <p>Erstelldatum: {new Date().toLocaleDateString()}</p>
              </div>

              <div
                className={`uebung-checkbox ${checked[index] ? 'checked' : ''}`}
                onClick={() => toggleChecked(index)}
              />
            </div>
          ))}

          <div className="button-row">
            <IonButton onClick={() => history.goBack()} color="medium">
              Cancel
            </IonButton>
            <IonButton onClick={handleSave} color="success">
              Speichern
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TrainingAusfuehren;
