/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filters } from './types';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loadError, setLoadError] = useState(true);
  const [filter, setFilter] = useState<Filters>(Filters.All);
  const completedTodos = todos.reduce(
    (acc, curr) => (!curr.completed ? acc + 1 : acc),
    0,
  );

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setLoadError(false);
        setTimeout(() => setLoadError(true), 3000);
      });
  }, []);

  const filTodos = useMemo(() => {
    const filtrTodos = [...todos];

    switch (filter) {
      case Filters.Active:
        return filtrTodos.filter(todo => todo.completed === false);

      case Filters.Completed:
        return filtrTodos.filter(todo => todo.completed);

      case Filters.All:
      default:
        return filtrTodos;
    }
  }, [filter, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={filTodos} />

        {todos.length !== 0 && (
          <TodoFooter
            selectedFilter={filter}
            todosLeft={completedTodos}
            onChangeFilter={setFilter}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        // eslint-disable-next-line max-len
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: loadError },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to load todos
        {/* <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>
    </div>
  );
};
