import {
  IonPage,
  IonContent,
  IonText,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonModal,
  IonInput,
  IonItem,
  IonLabel,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  getAktuelleKW,
  getKalorienWoche,
  addKalorienEintrag,
} from '../data/kalorien';
import './Kalorien.css';

const Kalorien: React.FC = () => {
  const aktuelleKW = getAktuelleKW();
  const [kw, setKw] = useState<number>(aktuelleKW);
  const [werte, setWerte] = useState<number[]>(getKalorienWoche(kw));

  const [showModal, setShowModal] = useState(false);
  const [neuerWert, setNeuerWert] = useState('');
  const [ausgewaehlterTag, setAusgewaehlterTag] = useState<number>(0);

  useEffect(() => {
    setWerte(getKalorienWoche(kw));
  }, [kw, showModal]);

  const handleEintrag = () => {
    const kcal = parseInt(neuerWert);
    if (!isNaN(kcal)) {
      addKalorienEintrag(kw, ausgewaehlterTag, kcal);
      setShowModal(false);
      setNeuerWert('');
    }
  };

  const wochentage = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  return (
    <IonPage>
      <IonContent fullscreen className="kalorien-page">
        <Navbar />
        <div className="content-offset">

          <div className="kalorien-card">
            <div className="card-header">
              <IonText className="card-title">Kalorien</IonText>
              <div className="kw-select-group">
                <span className="kw-label">KW:</span>
                <IonSelect value={kw} onIonChange={e => setKw(parseInt(e.detail.value))} interface="popover">
                  {Array.from({ length: 52 }, (_, i) => i + 1).map(nr => (
                    <IonSelectOption key={nr} value={nr}>{nr}</IonSelectOption>
                  ))}
                </IonSelect>
              </div>
              <IonButton fill="outline" onClick={() => setShowModal(true)}>+</IonButton>
            </div>

            <div className="kalorien-list">
              {wochentage.map((tag, i) => (
                <div className="kalorien-row" key={i}>
                  <div className="tag-label">{tag}</div>
                  <div className="balken" style={{ width: `${werte[i] / 40}%` }}>
                    {werte[i]} kcal
                  </div>
                </div>
              ))}
            </div>
          </div>

          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <div className="modal-content">
              <h2>Kalorien hinzufügen</h2>

              <IonItem>
                <IonLabel position="stacked">Wochentag</IonLabel>
                <IonSelect
                  value={ausgewaehlterTag}
                  onIonChange={(e) => setAusgewaehlterTag(e.detail.value)}
                >
                  {wochentage.map((t, i) => (
                    <IonSelectOption key={i} value={i}>{t}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>

              <IonItem>
                <IonLabel position="stacked">Kalorien</IonLabel>
                <IonInput
                  type="number"
                  value={neuerWert}
                  onIonChange={(e) => setNeuerWert(e.detail.value?.toString() || '')}
                />
              </IonItem>

              <div className="modal-buttons">
                <IonButton onClick={handleEintrag}>Speichern</IonButton>
                <IonButton color="medium" onClick={() => setShowModal(false)}>Abbrechen</IonButton>
              </div>
            </div>
          </IonModal>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Kalorien;
