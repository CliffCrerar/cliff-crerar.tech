import React from 'react';
import './App.scss';
import { PageOne, PageTwo, PageThree, Demo } from './pages';
import { Link, Router } from './router';
import {NavBar} from './components/navbar';

// const container = window !== undefined ? () => window().document.body : undefined;

function App() {

  const classes = {
    width: '300px'
  }

  return (
    <React.Fragment>
      <div className="App">

        <NavBar/>
        <div style={{height: 59}}></div>

        <Router>
          <Demo route="demo" />
          <PageOne route="/" />
          <PageTwo route="page-two" />
          <PageThree route="page-three" />
          <PageThree route="page-404" />
        </Router>
      </div>
    </React.Fragment>
  );
}

export default App;
