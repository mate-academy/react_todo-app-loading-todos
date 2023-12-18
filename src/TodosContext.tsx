import React, { useContext, useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { TodosContextType } from './types/TodosContextType';

export const USER_ID = 11543;

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
  addTodo: () => {},
  toggleTodo: () => {},
  toggleAll: () => {},
  clearCompleted: () => {},
  deleteTodo: () => {},
  updateTodoTitle: () => {},
  selectedStatus: Status.All,
  setSelectedStatus: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  removeErrorIn3sec: () => {},
  notCompletedTodos: 0,
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState(Status.All);
  const [errorMessage, setErrorMessage] = useState('');

  const removeErrorIn3sec = () => {
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        removeErrorIn3sec();
      });
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
    setTodos(todos.map(currTodo => (currTodo.id === id
      ? { ...currTodo, completed: !currTodo.completed }
      : currTodo)));
  };

  const updateTodoTitle = (id: number, newTitle: string) => {
    setTodos(todos.map(prevTodo => (prevTodo.id === id
      ? { ...prevTodo, title: newTitle }
      : prevTodo)));
  };

  const toggleAll = () => {
    const hasAllCompleted = todos.every(todo => todo.completed);

    const updatedTodos = todos.map(todo => ({
      ...todo,
      completed: !hasAllCompleted,
    }));

    setTodos(updatedTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(item => item.id !== id));
  };

  const notCompletedTodos = todos.filter(item => !item.completed).length;

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        toggleTodo,
        toggleAll,
        clearCompleted,
        deleteTodo,
        updateTodoTitle,
        selectedStatus,
        setSelectedStatus,
        errorMessage,
        setErrorMessage,
        removeErrorIn3sec,
        notCompletedTodos,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
