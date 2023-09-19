import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Filter } from '../Filter/Filter';
import { NewTodo } from '../NewTodo/NewTodo';
import { TodoList } from '../TodoList/TodoList';
import {
  TodosContext,
} from '../TodosContextProvider/TodosContextProvider';
import { TodoError } from '../TodoError/TodoError';
import { getTodos } from '../../api/todos';
import { FilterKey } from '../../types/FilterKey';
import { Todo } from '../../types/Todo';

export const USER_ID = 11492;

function getFilteredTodos(key: FilterKey, todos: Todo[]) {
  switch (key) {
    case FilterKey.All:
      return todos;
    case FilterKey.Active:
      return todos.filter(({ completed }) => !completed);
    case FilterKey.Completed:
      return todos.filter(({ completed }) => completed);
    default:
      return todos;
  }
}

export const TodoApp = () => {
  const { todos, setTodos } = useContext(TodosContext);
  const areAllTodosCompleted = todos.every(({ completed }) => completed);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterKey, setFilterKey] = useState<FilterKey>(FilterKey.All);

  const visibleTodos = getFilteredTodos(filterKey, todos);

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage(JSON.parse(error.message).error);
        setHasError(true);

        setTimeout(() => {
          setHasError(false);
        }, 3000);
      });
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          {/* eslint-disable */}
          <button
            type="button"
            className={classNames('todoapp__toggle-all', {
              'active': areAllTodosCompleted,
            })}
            />
          {/* eslint-enable */}

          {/* Add a todo on form submit */}
          <NewTodo />
        </header>

        <TodoList todos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            3 items left
          </span>

          {/* Active filter should have a 'selected' class */}
          <Filter
            filterKey={filterKey}
            onClick={setFilterKey}
          />

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>

        {hasError && (
          <TodoError
            errorMessage={errorMessage}
            hasError={hasError}
            onClick={setHasError}
          />
        )}
      </div>
    </div>
  );
};
