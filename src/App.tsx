/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoMain } from './components/TodoMain';
import { TodoFooter } from './components/TodoFooter';
import { TodoErrors } from './components/TodoErrors';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilteredBy } from './types/FilteredBy';
import { getFilteredTodos } from './utils/filter';

const USER_ID = 11127;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [filterBy, setFilterBy] = useState(FilteredBy.ALL);

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      }).catch(() => setError('Wrong URL - could not make a request'));
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, filterBy);
  }, [todos, filterBy]);

  const activeTodosLength = useMemo(() => {
    return filteredTodos
      .filter(filteredTodo => !filteredTodo.completed).length;
  }, [filteredTodos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={
              classNames('todoapp__toggle-all', {
                active: activeTodosLength !== 0,
              })
            }
          />
          <TodoForm />
        </header>

        {
          todos.length !== 0
          && (
            <>
              <TodoMain todos={filteredTodos} />
              <TodoFooter
                todos={todos}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
              />
            </>
          )
        }
      </div>

      {error.length !== 0
        && <TodoErrors error={error} />}
    </div>
  );
};
