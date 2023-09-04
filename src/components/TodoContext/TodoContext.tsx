import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { UserWarning } from '../../UserWarning';
import { getTodos } from '../../api/todos';

const USER_ID = 11383;

type Props = {
  children: React.ReactNode;
};

type TodoContextValue = {
  todos: Todo[];
  todosUncompleted: number;
  todosCompleted: boolean;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  toogleAll: () => void;
  deleteTodo: (id: number) => void;
  deleteComplitedTodo: () => void;
  updateTodo: (updatedTitle: string, id: number) => void;
  isError: boolean;
  setIsError: (isError: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
};

export const TodoContext = React.createContext<TodoContextValue>({
  todos: [],
  todosUncompleted: 0,
  todosCompleted: false,
  addTodo: () => {},
  toggleTodo: () => {},
  toogleAll: () => {},
  deleteTodo: () => { },
  deleteComplitedTodo: () => { },
  updateTodo: () => { },
  isError: false,
  setIsError: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (USER_ID) {
      getTodos(USER_ID)
        .then((fetchedTodos) => {
          setTodos(fetchedTodos);
        })
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error(error);
        });
    }
  }, []);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      userId: USER_ID,
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = [...todos];
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      updatedTodos[index].completed = !updatedTodos[index].completed;
    }

    setTodos(updatedTodos);
  };

  const toogleAll = () => {
    const allCompleted = todos.every(todo => todo.completed === true);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    const updatedTodos = [...todos];
    const index = todos.findIndex(todo => todo.id === id);

    if (index !== -1) {
      updatedTodos.splice(index, 1);
    }

    setTodos(updatedTodos);
  };

  const deleteComplitedTodo = () => {
    const updatedTodos = todos.filter(todo => !todo.completed);

    setTodos(updatedTodos);
  };

  const updateTodo = (updatedTitle: string, id: number) => {
    const updatedTodos = [...todos];
    const todoToUpdate = updatedTodos.find(todo => todo.id === id);

    if (todoToUpdate) {
      todoToUpdate.title = updatedTitle;
    }

    setTodos(updatedTodos);
  };

  const todosUncompleted = useMemo(() => todos.filter(
    todo => !todo.completed,
  ).length, [todos]);

  const todosCompleted = useMemo(
    () => todos.some(todo => todo.completed), [todos],
  );

  const contextValue: TodoContextValue = {
    todos,
    todosUncompleted,
    todosCompleted,
    addTodo,
    toggleTodo,
    toogleAll,
    deleteTodo,
    deleteComplitedTodo,
    updateTodo,
    isError,
    setIsError,
    errorMessage,
    setErrorMessage,
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = (): TodoContextValue => React.useContext(TodoContext);
