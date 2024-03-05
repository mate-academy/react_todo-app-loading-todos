/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';
import { AddTodo, EditTodo, RemoveTodo, Status, Todo } from '../types/Todo';
import { getTodos } from '../api/todos';

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
  editTodo: () => {},
  setTodos: () => {},
  status: Status.All,
  setStatus: () => {},
  filteredTodos: [],
  error: '',
  setError: () => '',
});

type TodosContextType = {
  todos: Todo[];
  addTodo: AddTodo;
  removeTodo: RemoveTodo;
  editTodo: EditTodo;
  setTodos: (v: Todo[]) => void;
  status: Status;
  setStatus: (el: Status) => void;
  filteredTodos: Todo[];
  error: string;
  setError: Dispatch<SetStateAction<string>>;
};

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState(Status.All);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(err => {
        setError('Unable to load todos');
        setTimeout(() => {
          setError('');
        }, 3000); // Встановлюємо повідомлення про помилку

        // eslint-disable-next-line no-console
        console.error('Error loading todos:', err);
      });
  }, []);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, newText: string) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: newText };
        }

        return todo;
      }),
    );
  };

  const filterTodos = () => {
    switch (status) {
      case Status.Active:
        setFilteredTodos(todos.filter(todo => !todo.completed));
        break;

      case Status.Completed:
        setFilteredTodos(todos.filter(todo => todo.completed));
        break;

      default:
        setFilteredTodos(todos);
        break;
    }
  };

  useEffect(() => {
    filterTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, todos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        addTodo,
        removeTodo,
        editTodo,
        setTodos,
        status,
        setStatus,
        filteredTodos,
        error,
        setError,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
