import { createContext, useEffect, useReducer } from 'react';
import { States } from '../types/States';
import { getTodos } from '../api/todos';
import { Todo } from '../types/Todo';

type DispatchContextType = {
  (action: Action): void;
};

type Action =
  | { type: 'startLoading' }
  | { type: 'stopLoading' }
  | { type: 'loadTodos'; payload: Todo[] }
  | { type: 'showError'; payload: string }
  | { type: 'startUpdate' }
  | { type: 'stopUpdate' };

const initialStates: States = {
  todos: [],
  isLoading: false,
  errorMessage: null,
  isUpdating: false,
};

function reducer(states: States, action: Action) {
  let newStates: States = { ...initialStates };

  switch (action.type) {
    case 'startLoading':
      newStates = { ...newStates, isLoading: true };
      break;
    case 'stopLoading':
      newStates = { ...newStates, isLoading: false };
      break;
    case 'loadTodos':
      newStates = { ...newStates, todos: action.payload };
      break;
    case 'showError':
      newStates = { ...newStates, errorMessage: action.payload };
      break;
    case 'startUpdate':
      newStates = { ...newStates, isUpdating: true };
      break;
    case 'stopUpdate':
      newStates = { ...newStates, isUpdating: false };
      break;
    default:
      return states;
  }

  return newStates;
}

export const StatesContext = createContext(initialStates);
export const DispatchContext = createContext<DispatchContextType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [states, dispatch] = useReducer(reducer, initialStates);

  useEffect(() => {
    dispatch({ type: 'startLoading' });
    getTodos()
      .then(todosFromServer => {
        dispatch({ type: 'loadTodos', payload: todosFromServer });
        // eslint-disable-next-line no-console
        console.log('todosFromServer', todosFromServer);
        // eslint-disable-next-line no-console
        console.log('states.todos', states.todos);
      })
      .catch(() =>
        dispatch({ type: 'showError', payload: `Unable to load todos` }),
      )
      .finally(() => {
        dispatch({ type: 'stopLoading' });
      });
  }, [states.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StatesContext.Provider value={states}>{children}</StatesContext.Provider>
    </DispatchContext.Provider>
  );
};
