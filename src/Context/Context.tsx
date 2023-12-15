import {
  FC,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Error, States, Todo } from '../types/Todo';
import { getTodos } from '../api/todos';
import { getFilteredTodos } from '../helpers';

interface TodoContextType {
  renderedTodos: Todo[];
  setRenderedTodos: (value: Todo[]) => void;
  filteredList: Todo[];
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  errorMessage: Error;
  setErrorMessage: React.Dispatch<React.SetStateAction<Error>>;
}

const TodoContext = createContext<TodoContextType>(
  {
    renderedTodos: [],
    setRenderedTodos: () => {},
    filteredList: [],
    selectedOption: '',
    setSelectedOption: () => {},
    errorMessage: {
      load: true,
      add: true,
      remove: true,
      title: true,
      update: true,
    },
    setErrorMessage: () => {},
  },
);

export const useTodoContext = () => useContext(TodoContext);

type Props = {
  children: React.ReactNode
};

const USER_ID = 12023;

export const errorMessages:Error = {
  load: true,
  title: true,
  add: true,
  remove: true,
  update: true,
};

export const TodoContextProvider: FC<Props> = ({ children }) => {
  const [renderedTodos, setRenderedTodos] = useState<Todo[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>(States.All);
  const [errorMessage, setErrorMessage] = useState<Error>(errorMessages);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setRenderedTodos)
      .catch(() => setErrorMessage(currentMessage => (
        { ...currentMessage, load: false })));
  }, []);

  const filteredList = getFilteredTodos(renderedTodos, selectedOption);

  const value: TodoContextType = {
    renderedTodos,
    setRenderedTodos,
    filteredList,
    selectedOption,
    setSelectedOption,
    errorMessage,
    setErrorMessage,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
