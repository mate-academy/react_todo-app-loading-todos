/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/FilterType';
import { TodoFilter } from './TodoFilter';
import { Todolist } from './TodoList';
import { TodoErrors } from './TodoErrors';

const USER_ID = 11129;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(FilterType.ALL);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    setErrorText('');
    getTodos(USER_ID)
      .then((fetchedTodos: Todo[]) => {
        setTodos(fetchedTodos);
      })
      .catch((error: Error) => {
        setErrorText(error.message);
        setTimeout(() => {
          setErrorText('');
        }, 3000);
      });
  }, []);

  const visibletodos = useMemo(() => {
    switch (filter) {
      case FilterType.COMPLETED:
        return todos.filter((todo) => todo.completed);
      case FilterType.ACTIVE:
        return todos.filter((todo) => !todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const activeTodos = todos.filter(todo => !todo.completed);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />
          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <Todolist todos={visibletodos} />

        {/* Hide the footer if there are no todos */}
        <footer className="todoapp__footer">
          <span className="todo-count">
            {`${activeTodos.length} items left`}
          </span>

          {/* Active filter should have a 'selected' class */}
          <TodoFilter filter={filter} setFilter={setFilter} />

          {/* don't show this button if there are no completed todos */}
          <button type="button" className="todoapp__clear-completed">
            Clear completed
          </button>
        </footer>
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <TodoErrors errorText={errorText} setErrorText={setErrorText} />
    </div>
  );
};
