import {
  IonPage,
  IonContent,
  IonText,
  IonInput,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import {
  getUebungById,
  updateUebung,
  Uebung,
} from '../data/uebungen';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { camera } from 'ionicons/icons';
import './UebungErstellen.css';

const UebungBearbeiten: React.FC = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();

  const [name, setName] = useState('');
  const [gewicht, setGewicht] = useState('');
  const [foto, setFoto] = useState<string | undefined>();

  useEffect(() => {
    const uebung = getUebungById(id);
    if (!uebung) {
      alert('Übung nicht gefunden.');
      history.push('/uebungen');
      return;
    }
    setName(uebung.name);
    setGewicht(uebung.gewicht);
    setFoto(uebung.foto);
  }, [id, history]);

  const handleUpdate = () => {
    if (!name || !gewicht) {
      alert('Bitte Name und Gewicht angeben');
      return;
    }

    const updatedUebung: Uebung = {
      id,
      name,
      gewicht,
      foto,
      createdAt: new Date().toISOString().split('T')[0],
    };

    updateUebung(updatedUebung);
    history.push('/uebungen');
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
      console.error('Fehler beim Öffnen der Kamera', err);
      alert('Kamera konnte nicht gestartet werden.');
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="uebung-erstellen-page">
        <Navbar />
        <div className="content-offset">
          <IonText className="title">
            <h2>Übung bearbeiten</h2>
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
            <IonButton onClick={() => history.push('/uebungen')}>Abbrechen</IonButton>
            <IonButton onClick={handleUpdate}>Speichern</IonButton>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default UebungBearbeiten;
