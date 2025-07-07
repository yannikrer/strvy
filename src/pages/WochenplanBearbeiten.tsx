import {
  IonPage,
  IonContent,
  IonText,
  IonSelect,
  IonSelectOption,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { getTrainings, Training } from '../data/trainings';
import {
  getAktuelleKW,
  getWochenplan,
  saveWochenplan,
  Wochenplan,
  WochenplanTag,
} from '../data/wochenplan';
import './WochenplanBearbeiten.css';

const WochenplanBearbeiten: React.FC = () => {
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [kw, setKw] = useState<number>(getAktuelleKW());
  const [plan, setPlan] = useState<Wochenplan>(getWochenplan(getAktuelleKW()));

  useEffect(() => {
    setTrainings(getTrainings());
  }, []);

  useEffect(() => {
    const neuerPlan = getWochenplan(kw);
    setPlan(neuerPlan);
  }, [kw]);

  const updateTrainingForTag = (tag: string, trainingId: string) => {
    const updatedTage = plan.tage.map((t: WochenplanTag) =>
      t.tag === tag ? { ...t, trainingId } : t
    );
    const updatedPlan = { ...plan, tage: updatedTage };
    setPlan(updatedPlan);
    saveWochenplan(updatedPlan);
  };

  const getTrainingColor = (id?: string) =>
    trainings.find((t) => t.id === id)?.farbe || '#333';

  return (
    <IonPage>
      <IonContent fullscreen className="wochenplan-page">
        <Navbar />
        <div className="content-offset">
          <div className="card-header">
            <IonText className="card-title">Wochenplan</IonText>
            <span className="kw-label">KW:</span>
            <IonSelect
              value={kw}
              onIonChange={(e) => setKw(parseInt(e.detail.value))}
              interface="popover"
              className="kw-select"
            >
              {Array.from({ length: 52 }, (_, i) => i + 1).map((nummer) => (
                <IonSelectOption key={nummer} value={nummer}>
                  {nummer}
                </IonSelectOption>
              ))}
            </IonSelect>
          </div>

          <div className="wochenplan-list">
            {plan.tage.map((tag) => (
              <div key={tag.tag} className="tag-row">
                <div className="tag-label">{tag.tag}</div>
                <IonSelect
                  value={tag.trainingId}
                  placeholder="Training wählen"
                  onIonChange={(e) => updateTrainingForTag(tag.tag, e.detail.value)}
                  interface="popover"
                  className="tag-select"
                >
                  {trainings.map((t) => (
                    <IonSelectOption key={t.id} value={t.id}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}
                      >
                        <div
                          style={{
                            width: '14px',
                            height: '14px',
                            borderRadius: '50%',
                            backgroundColor: t.farbe,
                          }}
                        />
                        <span>{t.name}</span>
                      </div>
                    </IonSelectOption>
                  ))}
                </IonSelect>

                {/* Farb-Balken Vorschau */}
                {tag.trainingId && (
                  <div
                    className="color-preview"
                    style={{
                      backgroundColor: getTrainingColor(tag.trainingId),
                    }}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default WochenplanBearbeiten;
