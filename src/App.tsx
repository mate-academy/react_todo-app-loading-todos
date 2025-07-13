/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { TodoErrorMessage } from './components/TodoErrorMessage';

export const ErrorMessages = Object.freeze({
  LOAD_TODOS: 'Unable to load todos',
  EMPTY_TITLE: 'Title should not be empty',
  ADD_TODO: 'Unable to add a todo',
  DELETE_TODO: 'Unable to delete a todo',
  UPDATE_TODO: 'Unable to update a todo',
});

type TodoStatus = 'all' | 'active' | 'completed';

const filterTodos = (todos: Todo[], status: TodoStatus): Todo[] => {
  if (status === 'active') {
    return todos.filter(todo => !todo.completed);
  }

  if (status === 'completed') {
    return todos.filter(todo => todo.completed);
  }

  return todos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<TodoStatus>('all');
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!USER_ID) {
      return;
    }

    const load = async () => {
      setLoading(true);
      setErrorMessage('');

      try {
        const loadedTodos = await getTodos();

        setTodos(loadedTodos);
        setVisibleTodos(loadedTodos);
      } catch {
        setErrorMessage('Unable to load todos');
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [errorMessage]);

  useEffect(() => {
    setVisibleTodos(filterTodos(todos, status));
  }, [todos, status]);

  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return () => clearTimeout(timeoutId);
    }

    return () => {};
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <TodoHeader />

        {!loading && <TodoList todos={visibleTodos} />}

        {!loading && todos.length > 0 && (
          <TodoFooter
            todos={todos}
            status={status}
            onStatusChange={setStatus}
          />
        )}
      </div>
      <TodoErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      ;
    </div>
  );
};
