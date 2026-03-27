import { createRoot } from 'react-dom/client';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './styles/index.scss';

import { App } from './App';
import { TodoProvider } from './store/TodoContext';
import { LoadingProvider } from './store/LoadingContext';
import { ErrorProvider } from './store/ErrorContext';

createRoot(document.getElementById('root') as HTMLDivElement).render(
  <TodoProvider>
    <LoadingProvider>
      <ErrorProvider>
        <App />
      </ErrorProvider>
    </LoadingProvider>
  </TodoProvider>,
);
