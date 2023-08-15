import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { AddTodo } from './сomponents/AddTodo';
import { TodosFilter } from './сomponents/TodosFilter';
import { TodoList } from './сomponents/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filter } from './types/Filter';

const USER_ID = 11337;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState<Filter>(Filter.all);
  let filteredTodos: Todo[];

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load a todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  switch (filterStatus) {
    case Filter.active:
      filteredTodos = todos.filter(todo => todo.completed === false);
      break;

    case Filter.completed:
      filteredTodos = todos.filter(todo => todo.completed === true);
      break;

    case Filter.all:
    default:
      filteredTodos = [...todos];
  }

  const filteredTodosCount = filteredTodos.length;
  const todosCount = todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddTodo todosLength={filteredTodosCount} />

        {!!filteredTodosCount && (
          <TodoList todos={filteredTodos} />
        )}

        {!!todosCount && (
          <TodosFilter
            onChangeStatus={setFilterStatus}
            status={filterStatus}
            todosCount={todosCount}
          />
        )}
      </div>

      <div className={classNames(
        'notification is-danger is-light has-text-weight-normal',
        { hidden: !errorMessage },
      )}
      >
        <button
          type="button"
          aria-label="Close error message"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
