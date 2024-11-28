/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as servisesTodos from './api/todos';
import { Todo } from './types/Todo';
import { TodoInput } from './components/AddTodo/TodoInput';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification } from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/FooterFiltering/Footer';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    servisesTodos
      .getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
      })
      .finally(() =>
        setTimeout(() => {
          setErrorMessage('');
        }, 3000),
      );
  }, []);

  const filteredTodos = useMemo(() => {
    if (filter === 'Active') {
      return todos.filter(todo => !todo.completed);
    }

    if (filter === 'Completed') {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }, [filter, todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoInput />

        <TodoList filteredTodos={filteredTodos} />
        {todos.length > 0 && (
          <Footer filter={filter} setFilter={setFilter} todos={todos} />
        )}
      </div>
      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
