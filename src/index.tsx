import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <HashRouter>
    <App />
  </HashRouter>,
);
