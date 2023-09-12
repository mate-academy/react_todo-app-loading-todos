import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { UserWarning } from '../UserWarning';
import { deleteTodos, getTodos } from '../api/todos';
import { TodoContextValue } from '../types/TodoContext';

const USER_ID = 11408;

type Props = {
  children: React.ReactNode;
};

export const TodoContext = React.createContext<TodoContextValue>({
  todos: [],
  todosUncompleted: 0,
  todosCompleted: false,
  addTodo: () => { },
  toggleTodo: () => { },
  toogleAll: () => { },
  deleteTodo: () => { },
  deleteComplitedTodo: () => { },
  updateTodo: () => { },
  isError: false,
  setIsError: () => { },
  errorMessage: '',
  setErrorMessage: () => { },
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
  }, [todos]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      userId: USER_ID,
      title,
      completed: false,
    };

    // createTodos({ id, title, completed });
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
    const allCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !allCompleted,
    }));

    setTodos(updatedTodos);
  };

  const deleteTodo = (id: number) => {
    // const updatedTodos = [...todos];
    // const index = todos.findIndex(todo => todo.id === id);

    // if (index !== -1) {
    //   updatedTodos.splice(index, 1);
    // }

    // setTodos(updatedTodos);
    deleteTodos(id);
  };

  const deleteCompletedTodo = () => {
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
    deleteComplitedTodo: deleteCompletedTodo,
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
