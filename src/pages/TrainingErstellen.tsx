import {
  IonPage,
  IonContent,
  IonText,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonCheckbox,
  IonLabel,
  IonItem,
  IonCard,
  IonCardContent,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import Navbar from '../components/Navbar';
import { getUebungen, Uebung } from '../data/uebungen';
import { addTraining } from '../data/trainings';
import './TrainingErstellen.css';

const TrainingErstellen: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [farbe, setFarbe] = useState('#4cd137');
  const [alleUebungen, setAlleUebungen] = useState<Uebung[]>([]);
  const [ausgewaehlteUebungen, setAusgewaehlteUebungen] = useState<Uebung[]>([]);
  const [auswahlId, setAuswahlId] = useState<string | undefined>(undefined);
  const [isRestDay, setIsRestDay] = useState(false);

  useEffect(() => {
    setAlleUebungen(getUebungen());
  }, []);

  useIonViewWillEnter(() => {
    setName('');
    setFarbe('#4cd137');
    setAusgewaehlteUebungen([]);
    setAuswahlId(undefined);
    setIsRestDay(false);
  });

  const handleAddUebung = () => {
    const uebung = alleUebungen.find((u) => u.id === auswahlId);
    if (uebung) {
      setAusgewaehlteUebungen([...ausgewaehlteUebungen, uebung]);
    }
    setAuswahlId(undefined);
  };

  const handleRemoveUebung = (index: number) => {
    const neueListe = [...ausgewaehlteUebungen];
    neueListe.splice(index, 1);
    setAusgewaehlteUebungen(neueListe);
  };

  const handleSave = () => {
    if (!name) {
      alert('Bitte Name eingeben.');
      return;
    }

    if (!isRestDay && ausgewaehlteUebungen.length === 0) {
      alert('Bitte mindestens eine Übung auswählen oder als Rest Day markieren.');
      return;
    }

    addTraining({
      name,
      farbe,
      uebungen: isRestDay ? [] : ausgewaehlteUebungen,
    });

    // Reset
    setName('');
    setFarbe('#4cd137');
    setAusgewaehlteUebungen([]);
    setAuswahlId(undefined);
    setIsRestDay(false);

    history.push('/training');
  };

  return (
    <IonPage>
      <IonContent fullscreen className="training-erstellen-page">
        <Navbar />

        <div className="content-offset">
          <IonText className="title">
            <h2>Training erstellen</h2>
          </IonText>

          <div className="input-group">
            <IonInput
              placeholder="Name"
              value={name}
              onIonChange={(e) => setName(e.detail.value!)}
              className="input"
            />
          </div>

          <div className="input-group">
            <label className="farbe-label">Farbe:</label>
            <input
              type="color"
              value={farbe}
              onChange={(e) => setFarbe(e.target.value)}
              className="color-picker"
            />
          </div>

          <div className="input-group">
            <IonItem lines="none" className="checkbox-item">
              <IonCheckbox
                checked={isRestDay}
                onIonChange={(e) => setIsRestDay(e.detail.checked)}
              />
              <IonLabel className="checkbox-label">Rest Day (keine Übungen)</IonLabel>
            </IonItem>
          </div>

          {!isRestDay && (
            <>
              <div className="input-group">
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
              </div>

              <div className="training-liste">
                {ausgewaehlteUebungen.map((u, index) => (
                  <IonCard
                    key={index}
                    className="uebung-card"
                    button
                    onClick={() => handleRemoveUebung(index)}
                  >
                    <IonCardContent>
                      <strong>{u.name}</strong>
                      <p>Gewicht: {u.gewicht}</p>
                      <p className="remove-hint">Klicken zum Entfernen</p>
                    </IonCardContent>
                  </IonCard>
                ))}
              </div>
            </>
          )}

          <div className="button-row">
            <IonButton onClick={() => history.push('/training')} color="medium">
              Cancel
            </IonButton>
            <IonButton onClick={handleSave} color="primary">
              Speichern
            </IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TrainingErstellen;
