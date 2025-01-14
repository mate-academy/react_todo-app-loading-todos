/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import { TodoForm } from './components/todoForm';
import { TodoList } from './components/todoList';
import { Filter } from './components/filter';
import { Notification } from './components/notification';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState('All');

  function getPreparedTodos(todoList: Todo[], filterType: string) {
    const preparedTodos = [...todoList];

    switch (filterType) {
      case 'All':
        return preparedTodos;
      case 'Completed':
        return preparedTodos.filter(todo => todo.completed);
      case 'Active':
        return preparedTodos.filter(todo => !todo.completed);
      default:
        return null;
    }
  }

  const preparedTodos = getPreparedTodos(todos, filterBy);

  function loadTodos() {
    setErrorMessage('');
    todoService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .then(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }

  useEffect(loadTodos, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoForm todos={todos} />
        </header>

        <TodoList preparedTodos={preparedTodos} errorMessage={errorMessage} />

        <Filter
          errorMessage={errorMessage}
          todos={todos}
          setFilterBy={setFilterBy}
          filterBy={filterBy}
        />
      </div>

      <Notification
        message={errorMessage}
        onClose={() => {
          setErrorMessage('');
        }}
      />
    </div>
  );
};
