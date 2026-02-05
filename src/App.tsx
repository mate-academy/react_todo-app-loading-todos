/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Button } from './components/Button/Button';
import { Todo } from './types/Todo';
import { TodoItem } from './components/TodoItem/TodoItem';
import { filterQuery } from './constants/constants';
import { Link } from './components/Link';
import classNames from 'classnames';

type Staus = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [statusTodo, setStatusTodo] = useState<Staus>('All');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [titleTodo, setTitleTodo] = useState('');

  const loadingTodos = () => {
    setErrorMessage('');
    setIsLoading(true);
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage(new Error('Unable to load todos').message);
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => loadingTodos(), []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const setFilter = (filter: Staus) => setStatusTodo(filter);

  const prepareTodos = (): Todo[] => {
    switch (statusTodo) {
      case 'Active':
        return todos.filter(todoItem => !todoItem.completed);
      case 'Completed':
        return todos.filter(todoItem => todoItem.completed);
      default:
        return todos;
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <Button
            type="button"
            className="todoapp__toggle-all
            active"
            dataCy="ToggleAllButton"
          />
          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={e => setTitleTodo(e.target.value)}
              value={titleTodo}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {prepareTodos().map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              completed={todo.completed}
              isLoading={isLoading}
            />
          ))}
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {todos.filter(todoItem => !todoItem.completed).length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              {filterQuery.map(query => (
                <Link
                  key={query}
                  href={`#/${query === 'All' ? '' : query.toLowerCase()}`}
                  className="filter__link"
                  dataCy={`FilterLink${query}`}
                  onClick={() => setFilter(query)}
                  content={query}
                  status={statusTodo}
                />
              ))}
            </nav>

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
        {/* Unable to load todos
        <br />
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
