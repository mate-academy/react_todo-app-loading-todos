/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { Filters } from './types/enumFilter';
import { Filter } from './components/Filter';
import { ErrorNotification } from './components/ErrorNotification';

const USER_ID = 11125;

const prepareTodos = (currentTodos: Todo[], field: Filters) => {
  let todosCopy = [...currentTodos];

  if (field !== Filters.All) {
    todosCopy = todosCopy.filter(todo => {
      switch (field) {
        case Filters.Active:
          return !todo.completed;
        case Filters.Completed:
          return todo.completed;
        default:
          return true;
      }
    });
  }

  return todosCopy;
};

// const testTodos: Todo[] = [{
//   id: 1,
//   userId: USER_ID,
//   title: 'Todo 1',
//   completed: true,
// },
// {
//   id: 2,
//   userId: USER_ID,
//   title: 'Todo 2',
//   completed: true,
// },
// {
//   id: 3,
//   userId: USER_ID,
//   title: 'Todo 3',
//   completed: false,
// },
// {
//   id: 4,
//   userId: USER_ID,
//   title: 'Todo 4',
//   completed: false,
// }];

export const App: React.FC = () => {
  const [todos, seTodos] = useState<Todo[]>([]);
  const [filteringField, setFilteringField] = useState(Filters.All);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(seTodos)
      .catch(() => {
        setErrorMessage('Unable to load a todo');

        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibletodos = prepareTodos(todos, filteringField);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {
            todos.some(todo => !todo.completed)
            && (
              <button type="button" className="todoapp__toggle-all active" />
            )
          }

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {todos.length && <TodoList todos={visibletodos} />}

        {visibletodos.length
          && (
            <footer className="todoapp__footer">
              <span className="todo-count">
                {
                  `${visibletodos.filter(todo => !todo.completed).length} items left`
                }
              </span>

              <Filter
                filteringField={filteringField}
                setFilteringField={setFilteringField}
              />

              {todos.some(todo => todo.completed)
              && (
                <button type="button" className="todoapp__clear-completed">
                  Clear completed
                </button>
              )}
            </footer>
          )}
      </div>

      <ErrorNotification
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
