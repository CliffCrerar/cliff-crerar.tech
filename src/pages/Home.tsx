import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>CliffCrerar.tech</IonTitle>
        </IonToolbar>
        {/* <IonToolbar></IonToolbar> */}
      </IonHeader>

      <IonContent fullscreen color="light">
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">CliffCrerar.tech</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
