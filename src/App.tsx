import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { SortType } from './types/SortType';
import { Todos } from './components/Todos/Todos';
import { Footer } from './components/Footer/Footer';

function getFilter(todos: Todo[], sortField: SortType) {
  switch (sortField) {
    case SortType.Active:
      return todos.filter(todo => !todo.completed);
    case SortType.Completed:
      return todos.filter(todo => todo.completed);
    default:
      return todos;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodos, setNewTodos] = useState<Todo[]>([]);
  const [sortField, setSortField] = useState(SortType.All);
  const [errorMessage, setErrorMessage] = useState('');

  const activeInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');

        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });

    if (activeInput.current) {
      activeInput.current.focus();
    }
  }, []);

  useEffect(
    () => setNewTodos(() => getFilter(todos, sortField)),
    [todos, sortField],
  );

  // const sortedTodos = getFilter(todos, sortField);

  const everyTodosCompleted = todos.every(todo => todo.completed);

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
            className={`todoapp__toggle-all ${everyTodosCompleted && 'active'}`}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              ref={activeInput}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <Todos todos={newTodos} />

        {todos.length !== 0 && (
          <Footer
            todos={todos}
            sortField={sortField}
            setSortField={setSortField}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal
        ${!errorMessage && 'hidden'}`}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {errorMessage}
      </div>
    </div>
  );
};
