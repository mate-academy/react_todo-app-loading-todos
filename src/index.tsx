import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { TodosProvider } from './components/todosContext';
import {
  ActiveProvider,
  AllProvider,
  CompletedProvider,
} from './components/filterContext';
import { ManageCheckboxProvider } from './components/manageCheckboxContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <ManageCheckboxProvider>
    <AllProvider>
      <ActiveProvider>
        <CompletedProvider>
          <TodosProvider>
            <App />
          </TodosProvider>
        </CompletedProvider>
      </ActiveProvider>
    </AllProvider>
  </ManageCheckboxProvider>,
);
