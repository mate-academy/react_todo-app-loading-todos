/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  ChangeEvent,
  useContext, useEffect, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorWindow } from './components/Auth/ErrorWindow/ErrorWindow';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [filterState, setFilterState] = useState('all');
  const [loadError, setLoadError] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');

  const handleFilter = (filterStatus: string) => {
    let copyOfTodos = [...todos];

    setFilterState(filterStatus);

    if (filterStatus !== 'all') {
      copyOfTodos = copyOfTodos.filter(todo => {
        switch (filterStatus) {
          case 'active':
            return !todo.completed;
          case 'completed':
            return todo.completed;
          default:
            return false;
        }
      });
    }

    setFiltredTodos(copyOfTodos);
  };

  const handleStatusChange = (todo: Todo, type: string) => {
    const found = todos.find(stateTodo => stateTodo.id === todo.id) as Todo;

    const withOutFound = todos.filter(stateTodo => stateTodo.id !== todo.id);

    switch (type) {
      case 'checkbox':
        found.completed = !found.completed;
        break;
      case 'title':
        setSelectedTodoId(null);
        found.title = inputValue;
        break;
      default:
        throw new Error('Error type');
    }

    setTodos([
      ...withOutFound,
      found,
    ]);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    const loadTodos = async () => {
      try {
        if (user) {
          const todoData = await getTodos(user.id);

          setTodos(todoData);
          setFiltredTodos(todoData);
        }
      } catch (_) {
        setLoadError(true);
        setTimeout(() => setLoadError(false), 3000);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, [selectedTodoId]);

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              ref={newTodoField}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filtredTodos.map(todo => {
            const { title, completed, id } = todo;

            return (
              <div
                data-cy="Todo"
                className={classNames(
                  'todo',
                  { completed },
                )}
                key={id}
              >
                <label className="todo__status-label">
                  <input
                    data-cy="TodoStatus"
                    type="checkbox"
                    className="todo__status"
                    defaultChecked
                    onClick={() => handleStatusChange(todo, 'checkbox')}
                  />
                </label>

                {(selectedTodoId !== id && (
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => {
                      setSelectedTodoId(todo.id);
                      setInputValue(title);
                    }}
                  >
                    {title}
                  </span>
                ))}
                {selectedTodoId === id
                && (
                  <input
                    value={inputValue}
                    className="input is-large is-primary"
                    onBlur={() => handleStatusChange(todo, 'title')}
                    onChange={handleChangeTitle}
                    ref={newTodoField}
                  />
                )}
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDeleteButton"
                >
                  ×
                </button>

                <div data-cy="TodoLoader" className="modal overlay">
                  <div className="modal-background has-background-white-ter" />
                  <div className="loader" />
                </div>
              </div>
            );
          })}

        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todos.filter(todo => !todo.completed).length} items left`}
            </span>

            <nav className="filter" data-cy="Filter">
              <a
                data-cy="FilterLinkAll"
                href="#/"
                className={classNames(
                  'filter__link',
                  {
                    selected: filterState === 'all',
                  },
                )}
                onClick={() => handleFilter('all')}
              >
                All
              </a>

              <a
                data-cy="FilterLinkActive"
                href="#/active"
                className={classNames(
                  'filter__link',
                  {
                    selected: filterState === 'active',
                  },
                )}
                onClick={() => handleFilter('active')}
              >
                Active
              </a>
              <a
                data-cy="FilterLinkCompleted"
                href="#/completed"
                className={classNames(
                  'filter__link',
                  {
                    selected: filterState === 'completed',
                  },
                )}
                onClick={() => handleFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              data-cy="ClearCompletedButton"
              type="button"
              className="todoapp__clear-completed"
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <ErrorWindow loadError={loadError} setLoadError={setLoadError} />

    </div>
  );
};
