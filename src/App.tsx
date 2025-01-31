/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterTodo } from './components/FilterTodo/FilterTodo';
import { FilterOption } from './types/FilterOption';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [completedTodosId, setCompletedTodosId] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTodoChanges, setIsTodoChanges] = useState(false);
  const [option, setOption] = useState(FilterOption.All);

  function loadTodos() {
    setLoading(true);

    getTodos()
      .then(data => {
        setTodosFromServer(data);
        setCompletedTodosId(
          data.filter(todo => todo.completed).map(todo => todo.id),
        );
      })
      .catch(() => setErrorMessage('Unable to load todos'))
      .finally(() => setLoading(false));
  }

  useEffect(() => loadTodos(), []);

  const toggleTodo = (id: number) => {
    setCompletedTodosId(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id],
    );
  };

  const filteredTodos = useMemo(() => {
    return todosFromServer.filter(todo => {
      if (option === FilterOption.Active) {
        return !completedTodosId.includes(todo.id);
      }

      if (option === FilterOption.Completed) {
        return completedTodosId.includes(todo.id);
      }

      return true;
    });
  }, [todosFromServer, completedTodosId, option]);

  const itemLeft = todosFromServer.length - completedTodosId.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <TodoList
          listOfTodos={filteredTodos}
          completedTodosId={completedTodosId}
          selectTodo={toggleTodo}
          isTodoChanges={isTodoChanges}
        />

        {/* Hide the footer if there are no todos */}
        {todosFromServer.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {`${itemLeft} items left`}
            </span>

            <FilterTodo selectedOption={option} onSelect={setOption} />

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={completedTodosId.length < 1}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification
        message={errorMessage}
        onClose={() => setErrorMessage('')}
      />
      {/*
        ErrorNotification text

        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
       */}
    </div>
  );
};
