
import './style.scss';
import splitview from "./splitview";
import videobg from './videobg';
import content from './content';

const app = document.createElement('main');

app.appendChild(videobg())
app.appendChild(splitview());
app.appendChild(content());

document.body.appendChild(app);