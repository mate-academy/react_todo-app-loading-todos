import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { USER_ID } from './api/userId';
import { UserWarning } from './UserWarning';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(USER_ID ? <App /> : <UserWarning />);
