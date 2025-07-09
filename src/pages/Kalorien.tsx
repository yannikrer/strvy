import {
  IonPage, IonContent, IonText, IonSelect, IonSelectOption,
  IonButton, IonModal, IonInput, IonItem, IonLabel
} from '@ionic/react';
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import {
  getAktuelleKW,
  getKalorienWoche,
  addKalorienEintrag,
  KalorienEintragDetails
} from '../data/kalorien';
import './Kalorien.css';

const Kalorien: React.FC = () => {
  const aktuelleKW = getAktuelleKW();
  const [kw, setKw] = useState<number>(aktuelleKW);
  const [werte, setWerte] = useState<KalorienEintragDetails[][]>([]);
  const [showModal, setShowModal] = useState(false);
  const [neuerWert, setNeuerWert] = useState('');
  const [titel, setTitel] = useState('');
  const [ausgewaehlterTag, setAusgewaehlterTag] = useState<number>(0);

  useEffect(() => {
    setWerte(getKalorienWoche(kw));
  }, [kw, showModal]);

  const resetModal = () => {
    setTitel('');
    setNeuerWert('');
    setAusgewaehlterTag(0);
  };

  const handleEintrag = () => {
    const kcal = parseInt(neuerWert);
    if (!isNaN(kcal) && titel.trim() !== '') {
      addKalorienEintrag(kw, ausgewaehlterTag, kcal, titel);
      setShowModal(false);
      resetModal();
    }
  };

  const openModal = () => {
    resetModal();
    setShowModal(true);
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
              <IonButton fill="solid" color="success" onClick={openModal}>+</IonButton>
            </div>

            <div className="kalorien-list">
              {wochentage.map((tag, i) => (
                <div className="tag-section" key={i}>
                  <IonText className="tag-title">{tag}</IonText>
                  {werte[i]?.length ? (
                    werte[i].map((e, idx) => (
                      <div key={idx} className="kalorien-entry">
                        <div className="entry-details">
                          <strong>{e.titel}</strong>
                          <p>{e.kcal} kcal</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="no-entry">Keine Einträge</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
            <div className="modal-content">
              <h2>Neuer Kalorien-Eintrag</h2>
              <IonItem>
                <IonLabel position="stacked">Wochentag</IonLabel>
                <IonSelect value={ausgewaehlterTag} onIonChange={(e) => setAusgewaehlterTag(e.detail.value)}>
                  {wochentage.map((t, i) => (
                    <IonSelectOption key={i} value={i}>{t}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Titel</IonLabel>
                <IonInput value={titel} onIonChange={e => setTitel(e.detail.value!)} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Kalorien</IonLabel>
                <IonInput type="number" value={neuerWert} onIonChange={(e) => setNeuerWert(e.detail.value!)} />
              </IonItem>
              <div className="modal-buttons">
                <IonButton expand="block" onClick={handleEintrag}>Speichern</IonButton>
                <IonButton expand="block" color="medium" onClick={() => setShowModal(false)}>Abbrechen</IonButton>
              </div>
            </div>
          </IonModal>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Kalorien;
