/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './utils/todos';

const USER_ID = '11161';

enum SortCondition {
  All,
  Active,
  Completed,
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(true);
  const [filterBy, setFilterBy] = useState(SortCondition.All);
  const [visibleItemsCount, setVisibleItemsCount] = useState(0);

  function setFilterCOndition(condition: SortCondition) {
    setFilterBy(condition);
  }

  function showNotification() {
    setIsNotificationVisible(true);

    setTimeout(() => {
      setIsNotificationVisible(false);
    }, 3000);
  }

  function filterTodos(allTodos: Todo[]) {
    let filteredTodos = allTodos;

    if (filterBy === SortCondition.Active) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    } else if (filterBy === SortCondition.Completed) {
      filteredTodos = filteredTodos.filter(todo => todo.completed);
    }

    setVisibleItemsCount(filteredTodos.length);
    setTodos(filteredTodos);
  }

  useEffect(() => {
    setIsNotificationVisible(false);

    getTodos(USER_ID)
      .then(allTodos => {
        filterTodos(allTodos);
      })
      .catch(() => {
        showNotification();
      });
  }, [filterBy]);

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

        {todos && (
          <>
            <TodoList todos={todos} />

            <footer className="todoapp__footer">
              <span className="todo-count">
                {`${visibleItemsCount} items left`}
              </span>

              <nav className="filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: filterBy === SortCondition.All,
                  })}
                  onClick={() => setFilterCOndition(SortCondition.All)}
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: filterBy === SortCondition.Active,
                  })}
                  onClick={() => setFilterCOndition(SortCondition.Active)}
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: filterBy === SortCondition.Completed,
                  })}
                  onClick={() => setFilterCOndition(SortCondition.Completed)}
                >
                  Completed
                </a>
              </nav>

              {/* don't show this button if there are no completed todos */}
              <button type="button" className="todoapp__clear-completed">
                Clear completed
              </button>
            </footer>
          </>
        )}
      </div>

      <div className={
        classNames('notification is-danger is-light has-text-weight-normal', {
          hidden: !isNotificationVisible,
        })
      }
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsNotificationVisible(false)}
        />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
