import React, { FormEvent, useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { USER_ID } from './api/todos';
import * as todoServises from './api/todos';
import { FilterField } from './utils/constants';

type ContextProps = {
  readyTodos: Todo[];
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
  handleSubmit: (event: FormEvent) => void;
  handleCompletedStatus: (todo: Todo) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (todo: Todo | null) => void;
  filterField: string;
  setFilterField: (field: string) => void;
};

export const TodoContext = React.createContext<ContextProps>({
  readyTodos: [],
  todos: [],
  setTodos: () => {},
  title: '',
  setTitle: () => {},
  handleSubmit: () => {},
  handleCompletedStatus: () => {},
  errorMessage: '',
  setErrorMessage: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
  filterField: '',
  setFilterField: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  function preparedTodos(todos: Todo[], filterField: string) {
    const readyTodos = [...todos];

    if (filterField) {
      switch (filterField) {
        case FilterField.ALL:
          return readyTodos;

        case FilterField.ACTIVE:
          return readyTodos.filter(todo => !todo.completed);

        case FilterField.COMPLETED:
          return readyTodos.filter(todo => todo.completed);

        default:
          return readyTodos;
      }
    }

    return readyTodos;
  }

  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filterField, setFilterField] = useState('all');

  useEffect(() => {
    todoServises
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  const readyTodos = preparedTodos(todos, filterField);

  const handleCompletedStatus = (currentTodo: Todo) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === currentTodo.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }),
    );
  };

  const addTodo = (newTodo: Todo) => {
    todoServises
      .createTodo(newTodo)
      .then(todo => {
        setTodos([...todos, todo]);
      })
      .catch(error => {
        setErrorMessage('Unable to add a todo');
        throw error;
      });

    setTitle('');
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    addTodo({
      id: +new Date(),
      userId: USER_ID,
      title: title.trim(),
      completed: false,
    });
  };

  const value = {
    readyTodos,
    todos,
    setTodos,
    title,
    setTitle,
    handleSubmit,
    handleCompletedStatus,
    errorMessage,
    setErrorMessage,
    selectedTodo,
    setSelectedTodo,
    filterField,
    setFilterField,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
