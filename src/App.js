import React from 'react';
import './App.css';
import { PageOne, PageTwo, PageThree } from './pages';
import { Link ,Router} from './router';

function App() {
  return (
    <div className="App">
      <Link navTo="/">PageOne</Link>
      <Link navTo="page-two">PageTwo</Link>
      <Link navTo="page-three">PageThree</Link>
      <Router>
        <PageOne route="/" />
        <PageTwo route="page-two" />
        <PageThree route="page-three" />
      </Router>
    </div>
  );
}

export default App;
