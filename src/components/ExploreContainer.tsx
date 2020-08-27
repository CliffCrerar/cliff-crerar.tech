import React from 'react';
import './ExploreContainer.css';
import { IonRouterLink, IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, IonCardTitle } from '@ionic/react';

interface ContainerProps { }

interface ISocialIcons {
  name: string;
  link: string;
  src?: string;
}

const SocialLinks = function () {
  return (
    <div className="social-links">{[
      { name: 'linkedIn', link: 'https://www.linkedin.com/in/cliff-crerar/', src: '' },
      { name: 'quora', link: 'https://www.quora.com/profile/Cliff-Crerar', src: '' },
      { name: 'facebook', link: 'https://www.facebook.com/cliff.crerar', src: '' },
      { name: 'twitter', link: 'https://twitter.com/Cliffenator', src: '' },
      { name: 'github', link: 'https://github.com/CliffCrerar', src: '' },
      { name: 'stack-overflow', link: 'https://stackoverflow.com/users/5599914/cliff-crerar', src: '' },
      { name: 'instagram', link: 'https://www.instagram.com/cliffenator/', src: '' },
      { name: 'pinterest', link: 'https://za.pinterest.com/cliffcrerar/', src: '' }
    ].map(item => {
      const imgSrc = `https://raw.githubusercontent.com/CliffCrerar/cliff-crerar.tech/V1.4.4/src/assets/${item.name}.svg`
      return (
        <div key={'el-' + item.name} className="">
          <IonRouterLink href={item.link}>
            <IonIcon size="large" color="tertiary" src={imgSrc}></IonIcon>
          </IonRouterLink>
        </div>
      )
    })}</div>)
}
const ExploreContainer: React.FC<ContainerProps> = () => {
  return (
    <div className="container">

      <IonCard className="ion-card">
        <IonCardHeader>
          <IonCardTitle>
            <strong>503</strong>
          </IonCardTitle>
          <IonCardSubtitle>
            <p>Site undergoing renovation</p>
          </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>

      <IonCard className="ion-card">
        <IonCardHeader>
          <IonCardTitle>
            In the meanwhile . . . .
            </IonCardTitle>
          <IonCardSubtitle>
            Find out more about me by visiting these resources
            </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <SocialLinks />
        </IonCardContent>
      </IonCard>
      <IonCard class="ion-card">
        <IonCardContent>
          OR<br />
          <IonRouterLink href="https://s3.eu-west-2.amazonaws.com/cdn-cloudflare.ga/resume/Resume-Cliff-Crerar.pdf">Click here to Download my resume</IonRouterLink>
        </IonCardContent>
      </IonCard>

      <div className="text-center">
        {/* <IonCard className="ion-card"> */}
        {/* <IonCardContent> */}
        <iframe style={{
          border: '0px transparent',
          height: '250px',
          width: '290px',
          margin: 'auto'
        }} title="linkedIn Profile" src="https://s3.eu-west-2.amazonaws.com/cdn-cloudflare.ga/assets/html-frames/linkedin-badges/small.html"></iframe>
        {/* </IonCardContent> */}
        {/* </IonCard> */}
      </div>

    </div>
  );
};

export default ExploreContainer;
