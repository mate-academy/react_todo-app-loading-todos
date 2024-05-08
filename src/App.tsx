/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState, useRef } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterField } from './types/FilterField';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

function getFilteredTodos(todos: Todo[], filterField: FilterField) {
  switch (filterField) {
    case FilterField.Active:
      return todos.filter(todo => !todo.completed);
    case FilterField.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterField, setFilterField] = useState(FilterField.All);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(value => setTodosFromServer(value as Todo[]))
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });

    // focus on text field when page is loaded
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(
    () => setVisibleTodos(() => getFilteredTodos(todosFromServer, filterField)),
    [todosFromServer, filterField],
  );

  const allTodosCompleted = todosFromServer.every(todo => todo.completed);
  const hasAnyTodos = todosFromServer.length !== 0;

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={`todoapp__toggle-all ${allTodosCompleted && 'active'}`}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={inputRef}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />

        {hasAnyTodos && (
          <Footer
            todos={todosFromServer}
            filterField={filterField}
            setFilterField={setFilterField}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal ${!errorMessage && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
      </div>
    </div>
  );
};
