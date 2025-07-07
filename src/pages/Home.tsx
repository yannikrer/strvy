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

const Home: React.FC = () => {
  const history = useHistory();
  const kw = getAktuelleKW();
  const plan = getWochenplan(kw);
  const trainings = getTrainings();

  const getTrainingColor = (id?: string) => {
    return trainings.find(t => t.id === id)?.farbe || '#333';
  };

  const handleTagClick = (tagIndex: number) => {
    const trainingId = plan.tage[tagIndex].trainingId;
    if (trainingId) {
      history.push(`/training-ausfuehren/${trainingId}`);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="home-page">
        <Navbar />
        <div className="content-offset">
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
                ></div>
              ))}
            </div>
            <div className="tag-labels">
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
