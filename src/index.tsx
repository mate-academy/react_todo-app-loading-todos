import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/Personal_Id';

createRoot(document.getElementById('root') as HTMLDivElement)
  .render(USER_ID ? <App /> : <UserWarning />);
