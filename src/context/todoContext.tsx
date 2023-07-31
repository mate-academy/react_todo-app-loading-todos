/* eslint-disable max-len */
/* eslint-disable no-console */
import React, {
  createContext, useEffect, useMemo, useState,
} from 'react';
import { Todo } from '../types/Todo';
import { SORT } from '../types/Sort';
import { client } from '../utils/fetchClient';
import { TodoError } from '../types/TodoError';

type Props = {
  children: React.ReactNode;
};

interface TodoContextType {
  inputValue: string;
  addNewTodoInput: (str: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  addTodo: (nextTodo: Todo) => void;
  todos: Todo[];
  handleCheck: (todoId: number) => void;
  handleDelete: (todoId: number) => void;
  countItemsLeft: () => number;
  itemsLeft: number;
  countItemsCompleted: () => number;
  itemsCompleted: number;
  resetCompleted: () => void;
  currentFilter: SORT;
  setCurrentFilter: React.Dispatch<React.SetStateAction<SORT>>;
  errorMessage: TodoError;
  setErrorMessage: React.Dispatch<React.SetStateAction<TodoError>>;
}

export const TodoContext = createContext<TodoContextType>({
  inputValue: '',
  addNewTodoInput: () => {},
  handleSubmit: () => {},
  addTodo: () => {},
  todos: [],
  handleCheck: () => {},
  handleDelete: () => {},
  countItemsLeft: () => 0,
  itemsLeft: 0,
  countItemsCompleted: () => 0,
  itemsCompleted: 0,
  resetCompleted: () => {},
  currentFilter: SORT.ALL,
  setCurrentFilter: () => {},
  errorMessage: TodoError.empty,
  setErrorMessage: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<SORT>(SORT.ALL);
  const [errorMessage, setErrorMessage] = useState(TodoError.empty);

  const USER_ID = 11238;

  const fetchTodosFromServer = async () => {
    try {
      const todosFromServer = await client.get<Todo[]>('/todos');
      const filteredTodos = todosFromServer.filter(
        (todo) => todo.userId === USER_ID,
      );

      setTodos(filteredTodos);
    } catch (error) {
      setErrorMessage(TodoError.load);
      console.error(`${errorMessage}`, error);
    }
  };

  useEffect(() => {
    fetchTodosFromServer();
  }, []);

  const addTodo = (nextTodo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, nextTodo]);
  };

  const handleCheck = (todoId: number) => {
    setTodos((prevTodos) => prevTodos.map((todo) => (todo.id === todoId ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDelete = (todoId: number) => {
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const addNewTodoInput = (str: string) => {
    setInputValue(str);
  };

  const countItemsLeft = () => {
    const notCompletedTask = todos.filter((todo) => todo.completed === false);

    return notCompletedTask.length;
  };

  const countItemsCompleted = () => {
    const completedTask = todos.filter((todo) => todo.completed === true);

    return completedTask.length;
  };

  const itemsLeft = useMemo(countItemsLeft, [todos]);
  const itemsCompleted = useMemo(countItemsCompleted, [todos]);

  const resetCompleted = () => {
    setTodos(todos.filter((todo) => todo.completed === false));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      userId: 11238,
      title: inputValue,
      completed: false,
    };

    addTodo(newTodo);
    setInputValue('');
  };

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (!todo.completed && currentFilter === SORT.COMPLETED) {
        return false;
      }

      if (todo.completed && currentFilter === SORT.ACTIVE) {
        return false;
      }

      return true;
    });
  }, [todos, currentFilter]);

  const value = {
    inputValue,
    addNewTodoInput,
    handleSubmit,
    todos: visibleTodos,
    addTodo,
    handleCheck,
    handleDelete,
    countItemsLeft,
    itemsLeft,
    resetCompleted,
    countItemsCompleted,
    itemsCompleted,
    currentFilter,
    setCurrentFilter,
    errorMessage,
    setErrorMessage,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
