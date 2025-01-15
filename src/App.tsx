/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import * as todoService from './api/todos';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Notification } from './components/Notification';
import { getPreparedTodos } from './utils/todoFilter';
import { Filter } from './types/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState(Filter.All);

  const preparedTodos = getPreparedTodos(todos, filterBy);

  const completedTasks = todos.filter(todo => todo.completed);

  const todoCount = todos.length - completedTasks.length;

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

        {!errorMessage && (
          <Footer
            errorMessage={errorMessage}
            todos={todos}
            setFilterBy={setFilterBy}
            filterBy={filterBy}
            todoCount={todoCount}
          />
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        onClose={() => {
          setErrorMessage('');
        }}
      />
    </div>
  );
};
