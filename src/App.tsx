/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';
import classNames from 'classnames';
import { AuthContext } from './components/Auth/AuthContext';
import {
  getTodos,
  createTodo,
  deleteTodo,
  editTodo,
} from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  // addTodo input
  const [newTodoField, setNewTodoField] = useState('');
  const [disabledInput, setdisabledInput] = useState(false);
  // Todo lists
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [renderTodoList, setRenderTodoList] = useState<Todo[]>([]);
  // eslint-disable-next-line max-len
  const [activeFilter, seTactiveFilter] = useState<'All' | 'Active' | 'Completed'>('All');

  // Random Id
  const randomId = Math.floor(Math.random() * 1000000);

  // Errors

  const [updateError, setUpdateError] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const [addError, setAddError] = useState(false);

  // UseEffects

  useEffect(() => {
    if (user) {
      getTodos(user.id).then(todos => {
        setTodoList(todos);
        setRenderTodoList(todos);
      }).catch(() => {
        setAddError(true);
        setTimeout(() => {
          setAddError(false);
        }, 4000);
      });
    }
  }, []);

  useEffect(() => {
    setRenderTodoList(todoList);
  }, [todoList]);

  // Loaders Todo

  const [loadingItems, setLoadingItems] = useState<number[]>([]);

  const addLoader = (id: number) => setLoadingItems([...loadingItems, id]);
  const remodeLoader = (id: number) => setLoadingItems([...loadingItems
    .splice(loadingItems.indexOf(id), 1)]);

  // functions
  const buttonAllCompleted = () => {
    if (todoList.every(todo => todo.completed === true)) {
      setTodoList([...todoList.map(todo => {
        editTodo(todo.id, {
          completed: false,
        }).catch(() => {
          setTodoList(todoList);
          setUpdateError(true);
          setTimeout(() => {
            setUpdateError(false);
          }, 4000);
        });

        return {
          ...todo,
          completed: false,
        };
      })]);
    } else {
      setTodoList([...todoList.map(todo => {
        editTodo(todo.id, {
          completed: true,
        }).catch(() => {
          setTodoList(todoList);
          setUpdateError(true);
          setTimeout(() => {
            setUpdateError(false);
          }, 4000);
        });

        return {
          ...todo,
          completed: true,
        };
      })]);
    }
  };

  const inputAddTodo = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      event.preventDefault();
      if (user && newTodoField) {
        setdisabledInput(true);
        addLoader(randomId);
        createTodo(user.id, {
          id: randomId,
          userId: user.id,
          title: newTodoField,
          completed: false,
        }).then(() => {
          setNewTodoField('');
          remodeLoader(randomId);
          setdisabledInput(false);
        }).catch(() => {
          setAddError(true);
          setTimeout(() => {
            setAddError(false);
          }, 10000);
        });
        setTodoList([...todoList, {
          id: randomId,
          userId: user.id,
          title: newTodoField,
          completed: false,
        }]);
      }
    }
  };

  const buttonDeleteCompleted = () => {
    todoList.forEach(todo => {
      if (todo.completed === true) {
        setLoadingItems((current) => [...current, todo.id]);

        deleteTodo(todo.id)
          .then(() => {
            setTodoList([...todoList
              .filter(todo2 => todo2.completed !== true)]);
          }).catch(() => {
            setLoadingItems([]);
            setDeleteError(true);
            setTimeout(() => {
              setDeleteError(false);
            }, 4000);
          });
      }
    });
  };

  const cleatErrors = () => {
    setAddError(false);
    setDeleteError(false);
    setUpdateError(false);
  };
  // Component

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        { /* header */ }

        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
            onClick={buttonAllCompleted}
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              value={newTodoField}
              className="todoapp__new-todo"
              onChange={(e) => {
                setNewTodoField(e.target.value);
              }}
              placeholder="What needs to be done?"
              onKeyDown={inputAddTodo}
              disabled={disabledInput}
            />
          </form>
        </header>

        { /* Main component */ }

        {user && (
          <TodoList
            renderTodoList={renderTodoList}
            setTodoList={setTodoList}
            todoList={todoList}
            loadingItems={loadingItems}
            setUpdateError={setUpdateError}
            setDeleteError={setDeleteError}
          />
        )}

        { /* Footer and nav */ }

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todoList.length} items left`}
          </span>

          <nav className="filter" data-cy="Filter">
            <a
              data-cy="FilterLinkAll"
              href="#/"
              className={classNames(
                'filter__link',
                { selected: activeFilter === 'All' },
              )}
              onClick={() => {
                seTactiveFilter('All');
                setRenderTodoList(todoList);
              }}
            >
              All
            </a>

            <a
              data-cy="FilterLinkActive"
              href="#/active"
              className={classNames(
                'filter__link',
                { selected: activeFilter === 'Active' },
              )}
              onClick={() => {
                seTactiveFilter('Active');
                setRenderTodoList(todoList
                  .filter(todo => todo.completed === false));
              }}
            >
              Active
            </a>
            <a
              data-cy="FilterLinkCompleted"
              href="#/completed"
              className={classNames(
                'filter__link',
                { selected: activeFilter === 'Completed' },
              )}
              onClick={() => {
                seTactiveFilter('Completed');
                setRenderTodoList(todoList
                  .filter(todo => todo.completed === true));
              }}
            >
              Completed
            </a>
          </nav>

          <button
            data-cy="ClearCompletedButton"
            type="button"
            className="todoapp__clear-completed"
            hidden={!renderTodoList.some(todo => todo.completed === true)}
            onClick={buttonDeleteCompleted}
          >
            Clear completed
          </button>
        </footer>
      </div>

      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal',
          { 'is-hidden': !addError && !deleteError && !updateError },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={cleatErrors}
        />

        {addError && 'Unable to add a todo'}

        {deleteError && 'Unable to delete a todo'}

        {updateError && 'Unable to update a todo'}
      </div>
    </div>
  );
};
