import {
  IonPage,
  IonContent,
  IonText,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useIonViewWillEnter } from '@ionic/react';
import Navbar from '../components/Navbar';
import { addUebung } from '../data/uebungen';
import './UebungErstellen.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons';

const UebungErstellen: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [gewicht, setGewicht] = useState('');
  const [foto, setFoto] = useState<string | undefined>(undefined);

  useIonViewWillEnter(() => {
    setName('');
    setGewicht('');
    setFoto(undefined);
  });

  const handleSave = () => {
    if (!name || !gewicht) {
      alert('Bitte Name & Gewicht ausfüllen');
      return;
    }

    try {
      addUebung({ name, gewicht, foto });

      // Reset
      setName('');
      setGewicht('');
      setFoto(undefined);

      history.push('/uebungen');
    } catch (err) {
      console.error('❌ Fehler beim Speichern:', err);
      alert('Fehler beim Speichern. Siehe Konsole.');
    }
  };

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 70,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });

      setFoto(image.dataUrl);
    } catch (err) {
      console.error('❌ Fehler beim Fotografieren:', err);
      alert('Kamera konnte nicht geöffnet werden.');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="uebung-erstellen-page">
        <Navbar />
        <div className="content-offset">
          <IonText className="title">
            <h2>Übung erstellen / bearbeiten</h2>
          </IonText>

          <IonInput
            placeholder="Name"
            value={name}
            onIonChange={(e) => setName(e.detail.value!)}
            className="input"
          />
          <IonInput
            placeholder="Gewicht"
            value={gewicht}
            onIonChange={(e) => setGewicht(e.detail.value!)}
            className="input"
          />

          <div className="foto-container" onClick={takePhoto}>
            {foto ? (
              <img src={foto} alt="Foto Vorschau" className="foto-preview" />
            ) : (
              <IonIcon icon={camera} className="camera-icon" />
            )}
          </div>

          <div className="button-row">
            <IonButton onClick={() => history.push('/uebungen')} color="medium">
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

export default UebungErstellen;
