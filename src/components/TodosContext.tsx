import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';
import { getTodos } from '../api/todos';

type Context = {
  todos: Todo[];
  filteredTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: string;
  setFilter: (v: string) => void;
  toggleAll: () => void;
  addTodo: (t: Todo) => void;
  handleDeleteCompleted: () => void;
  errorMessage: string;
  setErrorMessage: (m: string) => void;
};

export const TodosContext = React.createContext<Context>({
  todos: [],
  filteredTodos: [],
  setTodos: () => {},
  filter: Filter.ALL,
  setFilter: () => {},
  toggleAll: () => {},
  addTodo: () => {},
  handleDeleteCompleted: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const toggleAll = () => {
    let updatesTodos = [...todos];

    if (updatesTodos.some(todo => todo.completed === false)) {
      updatesTodos = updatesTodos.map(todo => ({
        ...todo,
        completed: true,
      }));

      setTodos(updatesTodos);
    } else {
      updatesTodos = updatesTodos.map(todo => ({
        ...todo,
        completed: false,
      }));

      setTodos(updatesTodos);
    }
  };

  const handleDeleteCompleted = () => {
    setTodos(currentTodos =>
      currentTodos.filter(todo => todo.completed === false),
    );
    setFilter(Filter.ALL);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === Filter.ALL) {
      return true;
    }

    if (filter === Filter.ACTIVE) {
      return !todo.completed;
    }

    return todo.completed;
  });

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  return (
    <TodosContext.Provider
      value={{
        todos,
        filteredTodos,
        setTodos,
        filter,
        setFilter,
        toggleAll,
        addTodo,
        handleDeleteCompleted,
        errorMessage,
        setErrorMessage,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
