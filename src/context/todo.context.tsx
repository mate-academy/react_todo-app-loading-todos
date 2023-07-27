import React, {
  PropsWithChildren, useEffect, useMemo, useState,
} from 'react';
import { Todo, TodoListFilterStatus } from '../types/Todo';
import { getTodos } from '../api/todos';
import {
  getFilteredTodos, getTodosStatistics, ITodosStatistics,
} from '../services/todo.service';
import { ErrorValues } from '../types/Error';

const USER_ID = 11215;

interface ITodoContext {
  todos: Todo[],
  handleTodoListFilterStatus: (status: TodoListFilterStatus) => void,
  todoListFilterStatus: TodoListFilterStatus,
  todosStatistics: ITodosStatistics,
  error: ErrorValues | null,
  handleError: (value: ErrorValues | null) => void,
}

export const TodoContext
  = React.createContext<ITodoContext>({} as ITodoContext);

export const TodoProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [todoListFilterStatus, setTodoListFilerStatus]
    = useState<TodoListFilterStatus>(TodoListFilterStatus.All);
  const [error, setError] = useState<ErrorValues | null>(null);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodosFromServer)
      .catch(() => setError(ErrorValues.RequestError));
  }, []);

  const todos = useMemo(() => {
    return getFilteredTodos(
      todosFromServer, { filterStatus: todoListFilterStatus },
    );
  }, [todosFromServer, todoListFilterStatus]);

  const handleTodoListFilterStatus = (status: TodoListFilterStatus) => {
    setTodoListFilerStatus(status);
  };

  const todosStatistics = useMemo(() => {
    return getTodosStatistics(todosFromServer);
  }, [todosFromServer]);

  const handleError = (value: ErrorValues | null) => {
    setError(value);
  };

  return (
    <TodoContext.Provider value={{
      todos,
      handleTodoListFilterStatus,
      todoListFilterStatus,
      todosStatistics,
      error,
      handleError,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};
