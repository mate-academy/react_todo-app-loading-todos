import { createContext, useReducer } from 'react';
import { States } from '../types/States';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type DispatchContextType = {
  (action: Action): void;
};

type Action =
  | { type: 'startLoading' }
  | { type: 'stopLoading' }
  | { type: 'loadTodos'; payload: Todo[] }
  | { type: 'showError'; payload: string | null }
  | { type: 'startUpdate' }
  | { type: 'stopUpdate' }
  | { type: 'selectTodo'; payload: number }
  | { type: 'updateTodos'; payload: Todo }
  | { type: 'setFilter'; payload: Filter };

const initialStates: States = {
  todos: [],
  isLoading: false,
  errorMessage: null,
  isUpdating: false,
  selectedTodo: null,
  filter: Filter.all,
};

function reducer(states: States, action: Action) {
  let newStates: States = { ...states };

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
    case 'selectTodo':
      newStates = { ...newStates, selectedTodo: action.payload };
      break;
    case 'updateTodos':
      newStates = {
        ...newStates,
        todos: states.todos.map(t =>
          action.payload.id === t.id ? action.payload : t,
        ),
      };
      break;
    case 'setFilter':
      newStates = { ...newStates, filter: action.payload };
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

  return (
    <DispatchContext.Provider value={dispatch}>
      <StatesContext.Provider value={states}>{children}</StatesContext.Provider>
    </DispatchContext.Provider>
  );
};
