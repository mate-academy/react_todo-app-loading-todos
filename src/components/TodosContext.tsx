import React, { useEffect, useState } from 'react';
import { Status } from '../types/Status';
import { TodoContextProps } from '../types/TodosContextProps';
import { getTodos } from '../api/todos';
import { Todo } from '../types/Todo';
// eslint-disable-next-line import/no-cycle
import { USER_ID } from '../App';

export const TodoContext = React
  .createContext<TodoContextProps>({
  todos: [],
  filter: Status.ALL,
  addTodo: () => {},
  toggleCompleted: () => {},
  toggleAllCompleted: () => {},
  deleteTodo: () => {},
  clearCompleted: () => {},
  updateTodoTitle: () => {},
  setFilter: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  handlerDeleteCompleted: () => {},
});

interface Props {
  children: React.ReactNode,
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(errorTimeout);
  }, [errorMessage]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleCompleted = (id: number) => {
    setTodos(prevTodos => prevTodos
      .map(todo => (todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo)));
  };

  const handlerDeleteCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleAllCompleted = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(prevTodos => prevTodos
      .map(todo => ({ ...todo, completed: !allCompleted })));
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(prevTodos => prevTodos
      .map(todo => (todo.id === id ? { ...todo, title: newTitle } : todo)));
  };

  const valueTodo: TodoContextProps = {
    todos,
    filter,
    addTodo,
    deleteTodo,
    toggleCompleted,
    toggleAllCompleted,
    clearCompleted,
    updateTodoTitle,
    setFilter,
    errorMessage,
    setErrorMessage,
    handlerDeleteCompleted,
  };

  return (
    <TodoContext.Provider value={valueTodo}>
      {children}
    </TodoContext.Provider>
  );
};
