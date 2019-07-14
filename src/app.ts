
import './style.scss';
import splitview from "./splitview";
import videobg from './videobg';


const app = document.createElement('main');

app.appendChild(videobg())
app.appendChild(splitview());

document.body.appendChild(app);