/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { TodoList } from '../TodoList/TodoList';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { Notification } from '../Notification/Notification';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { Status } from '../../types/Status';
import { USER_ID } from '../../utils/fetchClient';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Status>(Status.All);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');

    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
  }, []);

  let filteredTodos: Todo[] = [];

  switch (filter) {
    case Status.All:
      filteredTodos = todos;

      break;

    case Status.Active:
      filteredTodos = todos.filter(todo => !todo.completed);

      break;

    case Status.Completed:
      filteredTodos = todos.filter(todo => todo.completed);

      break;

    default: break;
  }

  const numberOfNonCompleted = todos.filter(todo => !todo.completed).length;

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {todos.length > 0 && (
            <button
              type="button"
              className={cn('todoapp__toggle-all', {
                active: activeTodos.length === 0,
              })}
              data-cy="ToggleAllButton"
            />
          )}
          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        <TodoList todos={filteredTodos} />
        {todos.length > 0 && (
          <TodosFilter
            filter={filter}
            setFilter={setFilter}
            numberOfNonCompleted={numberOfNonCompleted}
          />
        )}
      </div>
      <Notification
        errorMessage={errorMessage}
      />
    </div>
  );
};
