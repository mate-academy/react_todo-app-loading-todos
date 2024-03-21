import { createContext, useContext, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { getTodos } from '../api/todos';
import { wait } from '../utils/fetchClient';

type FilterStatus = keyof typeof Status;

type State = {
  todos: Todo[];
  isLoading: boolean;
  todosError: string;
  filterStatus: FilterStatus;
  handleFilterTodo: (status: FilterStatus) => void;
  handleRemoveError: () => void;
};

const initialState: State = {
  todos: [],
  isLoading: false,
  todosError: '',
  filterStatus: 'All',
  handleFilterTodo: () => {},
  handleRemoveError: () => {},
};

const TodosContext = createContext(initialState);

type Action =
  | { type: 'todos/loaded'; payload: Todo[] }
  | { type: 'todos/setFilterStatus'; payload: FilterStatus }
  | { type: 'rejected'; payload: string }
  | { type: 'todos/removeError' }
  | { type: 'loading'; payload: boolean };

type Props = {
  children: React.ReactNode;
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: action.payload };

    case 'todos/loaded':
      return { ...state, isLoading: false, todos: action.payload };

    case 'todos/setFilterStatus':
      return {
        ...state,
        filterStatus: action.payload,
      };

    case 'todos/removeError':
      return { ...state, todosError: '' };

    case 'rejected':
      return { ...state, isLoading: false, todosError: action.payload };
    default:
      return state;
  }
}

const TodosProvider: React.FC<Props> = ({ children }) => {
  const [{ todos, filterStatus, isLoading, todosError }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const handleRemoveError = () => {
    dispatch({ type: 'todos/removeError' });
  };

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: 'loading', payload: true });
      try {
        const fetchedTodos = await getTodos();

        dispatch({ type: 'todos/loaded', payload: fetchedTodos });
      } catch {
        dispatch({
          type: 'rejected',
          payload: 'Unable to load todos',
        });

        wait(3000).then(handleRemoveError);
      }
    };

    fetchTodos();
  }, []);

  const handleFilterTodo = (status: FilterStatus) => {
    dispatch({ type: 'todos/setFilterStatus', payload: status });
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        isLoading,
        todosError,
        filterStatus,
        handleRemoveError,
        handleFilterTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

const useTodos = () => {
  const context = useContext(TodosContext);

  if (context === undefined) {
    throw new Error('TodosContext was used outside of the PostProvider');
  }

  return context;
};

export { useTodos, TodosProvider };
