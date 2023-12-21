import React, { useEffect, useMemo, useState } from 'react';
import { Todo, TodoID } from '../types/Todo';
import { TodosFilterQuery } from '../constants';
import getPreparedTodos from '../utils/getPreparedTodos';
import { getTodos } from '../api/todos';

interface TodosContextType {
  todos: Todo[];
  preparedTodos: Todo[];
  query: TodosFilterQuery,
  error: string,
  addTodo: (newTodo: Todo) => void;
  editTodo: (todoToEdit: Todo) => void;
  deleteTodo: (todoID: TodoID) => void;
  setQuery: React.Dispatch<React.SetStateAction<TodosFilterQuery>>,
  setError: React.Dispatch<React.SetStateAction<string>>,
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  preparedTodos: [],
  query: TodosFilterQuery.all,
  error: '',
  addTodo: () => { },
  editTodo: () => { },
  deleteTodo: () => { },
  setQuery: () => { },
  setError: () => {},
});

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState(TodosFilterQuery.all);
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Something went wrong. Failed to load todos');
      });
  }, []);

  const preparedTodos = useMemo(
    () => getPreparedTodos(todos, query),
    [todos, query],
  );

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const editTodo = (todoToEdit: Todo) => {
    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id === todoToEdit.id) {
        return todoToEdit;
      }

      return todo;
    }));
  };

  const deleteTodo = (todoID: TodoID) => {
    setTodos(prevTodos => (
      prevTodos.filter(todo => todo.id !== todoID)
    ));
  };

  const value: TodosContextType = {
    todos,
    preparedTodos,
    query,
    error,
    addTodo,
    editTodo,
    deleteTodo,
    setQuery,
    setError,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
