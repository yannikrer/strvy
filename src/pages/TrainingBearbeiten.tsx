import {
  IonPage,
  IonContent,
  IonText,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getTrainings, updateTraining, Training } from '../data/trainings';
import { getUebungen, Uebung } from '../data/uebungen';
import './TrainingErstellen.css';

interface RouteParams {
  id: string;
}

const TrainingBearbeiten: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();

  const [name, setName] = useState('');
  const [farbe, setFarbe] = useState('#00ff00');
  const [createdAt, setCreatedAt] = useState('');
  const [alleUebungen, setAlleUebungen] = useState<Uebung[]>([]);
  const [ausgewaehlteUebungen, setAusgewaehlteUebungen] = useState<Uebung[]>([]);
  const [auswahlId, setAuswahlId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const trainings = getTrainings();
    const training = trainings.find((t) => t.id === id);
    if (!training) return alert('Training nicht gefunden.');

    setName(training.name);
    setFarbe(training.farbe);
    setCreatedAt(training.createdAt);
    setAusgewaehlteUebungen(training.uebungen);
    setAlleUebungen(getUebungen());
  }, [id]);

  const handleAddUebung = () => {
    const uebung = alleUebungen.find((u) => u.id === auswahlId);
    if (uebung) {
      setAusgewaehlteUebungen([...ausgewaehlteUebungen, uebung]);
    }
    setAuswahlId(undefined);
  };

  const handleRemoveUebung = (index: number) => {
    const neueListe = [...ausgewaehlteUebungen];
    neueListe.splice(index, 1); // Nur die eine Instanz entfernen
    setAusgewaehlteUebungen(neueListe);
  };

  const handleSave = () => {
    if (!name || ausgewaehlteUebungen.length === 0) {
      alert('Bitte Name und mindestens eine Übung eingeben.');
      return;
    }

    const updatedTraining: Training = {
      id,
      name,
      farbe,
      createdAt,
      uebungen: ausgewaehlteUebungen,
    };

    updateTraining(updatedTraining);
    history.push('/training');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="training-erstellen-page">
        <Navbar />
        <div className="content-offset">
          <IonText className="title">
            <h2>Training bearbeiten</h2>
          </IonText>

          <IonInput
            placeholder="Name"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
            className="input"
          />

          <label className="farbe-label">Farbe:</label>
          <input
            type="color"
            value={farbe}
            onChange={(e) => setFarbe(e.target.value)}
            className="color-picker"
          />

          <IonSelect
            placeholder="Übung auswählen"
            value={auswahlId}
            onIonChange={(e) => setAuswahlId(e.detail.value)}
            interface="popover"
          >
            {alleUebungen.map((u) => (
              <IonSelectOption key={u.id} value={u.id}>
                {u.name}
              </IonSelectOption>
            ))}
          </IonSelect>

          <IonButton expand="block" onClick={handleAddUebung}>
            Hinzufügen
          </IonButton>

          <div className="training-liste">
            {ausgewaehlteUebungen.map((u, index) => (
              <div
                key={index}
                className="training-item"
                onClick={() => handleRemoveUebung(index)}
              >
                <strong>{u.name}</strong>
                <p>Gewicht: {u.gewicht}</p>
                <p style={{ color: '#ff4d4d', fontSize: '13px' }}>
                  Klicken zum Entfernen
                </p>
              </div>
            ))}
          </div>

          <div className="button-row">
            <IonButton onClick={() => history.push('/training')}>Cancel</IonButton>
            <IonButton onClick={handleSave}>Speichern</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TrainingBearbeiten;
