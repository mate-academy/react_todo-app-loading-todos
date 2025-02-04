/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { Filter } from './types/Filter';
import { TodoFooter } from './components/TodoFooter';
import { getFilteredTodos } from './utils/filterTodos';
import { TodoHeader } from './components/TodoHeader';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState(Filter.All);

  const notCompletedTasksCounter = todos.filter(todo => !todo.completed).length;
  const todosFiltered = getFilteredTodos(todos, filterBy);

  const loadTodos = () => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
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

        <TodoList todos={todosFiltered} />

        {todos.length > 0 && (
          <TodoFooter
            filterBy={filterBy}
            setFilterBy={setFilterBy}
            notCompletedTasksCounter={notCompletedTasksCounter}
          />
        )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
