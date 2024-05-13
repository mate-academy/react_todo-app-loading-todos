import {
  Dispatch,
  FC,
  ReactNode,
  createContext,
  createRef,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoReducer } from './TodoReducer';

export interface TodoContextType {
  todos: Todo[];
  inputRef: typeof createRef<HTMLInputElement> | null;
  dispatch: React.Dispatch<Action>;
  handleFocusInput: () => void;
  editFlag: boolean;
  editID: string;
  textToEdit: string;
  allCompleted: boolean;
  numberNotComplete: number;
  numberComplete: number;
}

export type Action = { type: string; payload?: string | Todo | Todo[] };

type TProps = {
  children: ReactNode;
};

const defaultDispatch: Dispatch<Action> = () => {
  throw new Error('Dispatch function not provided');
};

const initialState: TodoContextType = {
  todos: [],
  inputRef: null,
  editFlag: false,
  editID: '',
  textToEdit: '',
  allCompleted: false,
  numberNotComplete: 0,
  numberComplete: 0,
  dispatch: defaultDispatch,
  handleFocusInput: () => {},
};

export const TodoDispatch = createContext<Dispatch<Action>>(() => {});
export const TodoContext = createContext<TodoContextType>(initialState);

export const TodoProvider: FC<TProps> = ({ children }) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState, () => {
    const localValue = localStorage.getItem('todos');

    return {
      ...initialState,
      todos: localValue ? JSON.parse(localValue) : initialState.todos,
    };
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef]);

  const allCompleted: boolean = state.todos.every(
    (todo: Todo) => todo.completed,
  );
  const numberNotComplete: number = state.todos.filter(
    (todo: Todo) => !todo.completed,
  ).length;
  const numberComplete: number = state.todos.filter(
    (todo: Todo) => todo.completed,
  ).length;

  const value = useMemo(
    () => ({
      ...state,
      allCompleted,
      numberNotComplete,
      numberComplete,
      inputRef,
      dispatch,
      handleFocusInput,
    }),
    [state, allCompleted, numberNotComplete, numberComplete, dispatch],
  );

  return (
    <TodoDispatch.Provider value={dispatch}>
      <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
    </TodoDispatch.Provider>
  );
};
