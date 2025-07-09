import {
  IonPage,
  IonContent,
  IonText,
  IonIcon,
} from '@ionic/react';
import './Home.css';
import Navbar from '../components/Navbar';
import { arrowForward } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getAktuelleKW, getWochenplan } from '../data/wochenplan';
import { getTrainings } from '../data/trainings';
import { getKalorienWoche } from '../data/kalorien';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const history = useHistory();
  const kw = getAktuelleKW();
  const plan = getWochenplan(kw);
  const trainings = getTrainings();

  const [kalorienWoche, setKalorienWoche] = useState<number[]>([]);

  useEffect(() => {
    const werte = getKalorienWoche(kw);
    setKalorienWoche(werte);
  }, [kw]);

  const getTrainingColor = (id?: string) =>
    trainings.find(t => t.id === id)?.farbe || '#333';

  const handleTagClick = (tagIndex: number) => {
    const trainingId = plan.tage[tagIndex].trainingId;
    if (trainingId) {
      history.push(`/training-ausfuehren/${trainingId}`);
    }
  };

  const wochentage = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

  return (
    <IonPage>
      <IonContent fullscreen className="home-page">
        <Navbar />
        <div className="content-offset">

          {/* Wochenplan */}
          <div className="wochenplan-card">
            <div className="card-header">
              <IonText className="card-title">Wochenplan</IonText>
              <IonIcon
                icon={arrowForward}
                className="arrow-icon"
                onClick={() => history.push('/wochenplan')}
              />
            </div>
            <div className="tag-bar-container">
              {plan.tage.map((tag, index) => (
                <div
                  key={index}
                  className="tag-bar"
                  style={{ backgroundColor: getTrainingColor(tag.trainingId) }}
                  onClick={() => handleTagClick(index)}
                />
              ))}
            </div>
            <div className="tag-labels">
              {wochentage.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>

          {/* Kalorien Tracker */}
          <div className="wochenplan-card">
            <div className="card-header">
              <IonText className="card-title">
                Kalorien <span className="small-gray">(aktuelle Woche)</span>
              </IonText>
              <IonIcon
                icon={arrowForward}
                className="arrow-icon"
                onClick={() => history.push('/kalorien')}
              />
            </div>

            <div className="kalorien-chart">
              {kalorienWoche.length === 7 ? (
                (() => {
                  const max = Math.max(...kalorienWoche, 1); // kein 0-div
                  return kalorienWoche.map((kcal, index) => (
                    <div key={index} className="kalorien-column">
                      <div
                        className="kalorien-bar"
                        style={{
                          height: `${(kcal / max) * 100}%`,
                          backgroundColor: kcal > 0 ? '#4caf50' : '#444',
                        }}
                        title={`${kcal} kcal`}
                      />
                      <div className="kalorien-label">{wochentage[index]}</div>
                    </div>
                  ));
                })()
              ) : (
                Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="kalorien-column">
                    <div className="kalorien-bar" style={{ height: '5%', backgroundColor: '#444' }} />
                    <div className="kalorien-label">{wochentage[i]}</div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
