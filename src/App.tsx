/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  changeTodoStatus,
  createTodo,
  deleteTodo,
  getTodos,
} from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/Todo/TodoList';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter_Enum';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [update, setUpdate] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<TodosFilter>(TodosFilter.All);

  const [alertText, setAlertText] = useState('');
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [alertTimerId, setAlertTimerId] = useState<NodeJS.Timeout | null>(null);

  const clearAlert = () => {
    if (alertTimerId !== null) {
      clearTimeout(alertTimerId);
      setAlertTimerId(null);
    }

    setAlertVisible(false);
  };

  const showAlert = (error: string) => {
    clearAlert();
    setAlertText(error);
    setAlertVisible(true);
    setAlertTimerId(setTimeout(() => {
      setAlertVisible(false);
    }, 3000));
  };

  const handleClearAlert = () => clearAlert();

  const handleDeleteError = () => showAlert('Unable to add Todo');
  const handleUpdateError = () => showAlert('Unable to update Todo');

  const forceUpdate = () => {
    setUpdate(prevValue => prevValue + 1);
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.id, filterTodos)
        .then(todosFromServer => {
          setTodos(todosFromServer);
        })
        .catch(() => showAlert('Unable to get Todos'));
    }
  }, [filterTodos,
    update,
  ]);

  const isInterfaceHidden = () => (todos.length === 0
    && filterTodos === TodosFilter.All);

  const handleFilterTodos = (filterValue: TodosFilter) => {
    setFilterTodos(filterValue);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = newTodoField.current?.value.trim();

    if (title !== '' && title && user) {
      clearAlert();
      createTodo({
        id: 0,
        userId: user.id,
        title,
        completed: false,
      })
        .then(() => forceUpdate())
        .catch(() => showAlert('Unable to add Todo'))
        .finally(() => {
          if (newTodoField.current) {
            newTodoField.current.value = '';
          }
        });
    }
  };

  const handleChangeStatus = (todoId: number, status: boolean) => {
    clearAlert();
    changeTodoStatus(todoId, !status)
      .then(() => forceUpdate())
      .catch(() => showAlert('Unable to update Todo'));
  };

  const handleDeleteTodo = (todoId: number) => {
    clearAlert();
    deleteTodo(todoId)
      .then(() => forceUpdate())
      .catch(() => handleDeleteError());
  };

  const handleDeleteCompleted = () => {
    const completedTodos = todos.filter((todo) => todo.completed);

    completedTodos.forEach((todo, index) => {
      clearAlert();
      if (index === completedTodos.length - 1) {
        deleteTodo(todo.id)
          .then(() => forceUpdate())
          .catch(() => handleDeleteError());
      } else {
        deleteTodo(todo.id)
          .catch(() => handleDeleteError());
      }
    });
  };

  const handleToggleAllTodos = () => {
    const toggleValue = !todos.every((todo) => todo.completed);

    todos.forEach((todo, index) => {
      clearAlert();
      if (index === todos.length - 1) {
        changeTodoStatus(todo.id, toggleValue)
          .then(() => forceUpdate())
          .catch(() => handleUpdateError());
      } else {
        changeTodoStatus(todo.id, toggleValue);
      }
    });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className={classNames(
              'todoapp__toggle-all',
              (todos.every((todo) => todo.completed) && todos.length !== 0)
                ? 'active'
                : '',
            )}
            onClick={handleToggleAllTodos}
          />

          <form
            onSubmit={(event) => handleSubmit(event)}
          >
            <input
              data-cy="NewTodoField"
              name="todoTitle"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        {
          !isInterfaceHidden() && (
            <>
              <TodoList
                todos={todos}
                handleChangeStatus={handleChangeStatus}
                handleDeleteTodo={handleDeleteTodo}
              />

              <footer className="todoapp__footer" data-cy="Footer">
                <span className="todo-count" data-cy="todosCounter">
                  {`${todos.length} items left`}
                </span>

                <nav className="filter" data-cy="Filter">
                  <a
                    data-cy="FilterLinkAll"
                    href="#/"
                    className={classNames(
                      'filter__link',
                      {
                        selected: filterTodos === TodosFilter.All,
                      },
                    )}
                    onClick={() => handleFilterTodos(TodosFilter.All)}
                  >
                    All
                  </a>

                  <a
                    data-cy="FilterLinkActive"
                    href="#/active"
                    className={classNames(
                      'filter__link',
                      {
                        selected: filterTodos === TodosFilter.Active,
                      },
                    )}
                    onClick={() => handleFilterTodos(TodosFilter.Active)}
                  >
                    Active
                  </a>
                  <a
                    data-cy="FilterLinkCompleted"
                    href="#/completed"
                    className={classNames(
                      'filter__link',
                      {
                        selected: filterTodos === TodosFilter.Completed,
                      },
                    )}
                    onClick={() => handleFilterTodos(TodosFilter.Completed)}
                  >
                    Completed
                  </a>
                </nav>

                <button
                  data-cy="ClearCompletedButton"
                  type="button"
                  className="todoapp__clear-completed"
                  onClick={() => handleDeleteCompleted()}
                  disabled={todos.every((todo) => !todo.completed)}
                >
                  Clear completed
                </button>
              </footer>
            </>
          )
        }

        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
          hidden={!isAlertVisible}
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => handleClearAlert()}
          />
          {alertText}
        </div>
      </div>
    </div>
  );
};
