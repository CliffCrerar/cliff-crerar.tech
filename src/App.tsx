
import './App.css';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {Home} from "./pages";


// import { Switch } from '@mui/material';

function App() {
  return (
   <Router>
     <nav>
        NAV
     </nav>
     <Switch>
       <Route path="/">
         <Home/>

       </Route>
     </Switch>
   </Router>
  );
}

export default App;
