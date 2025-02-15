/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import * as apiService from './api/todos';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotifications } from './components/ErrorNotifications';
import { TypeFilter } from './types/TypeFilter';
import { getFilteredTodos } from './utils/filterTodos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState(TypeFilter.All);

  const notCompletedTasksCounter = todos.filter(todo => !todo.completed).length;
  const filteredTodos = getFilteredTodos(todos, filterBy);

  const loadTodos = () => {
    setErrorMessage('');
    apiService
      .getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage('Unable to load todos'))
      .then(() => {
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  };

  useEffect(loadTodos, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />
        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <TodoFooter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            notCompletedTasksCounter={notCompletedTasksCounter}
          />
        )}
      </div>
      <ErrorNotifications
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
