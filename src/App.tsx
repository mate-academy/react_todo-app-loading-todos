/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';
import React, {
  useEffect, useState, FormEvent, useMemo,
} from 'react';
import { Todo } from './types/Todo';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { client } from './utils/client';
import { Error } from './errorMessage';

const USER_ID = 10377;

enum SortType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todo, setTodo] = useState<Todo[]>([]);
  const [selectedTab, setSelectedTab] = useState(SortType.All);
  const [isLoading, setIsLoading] = useState(false);
  const [isThereActiveTodo, setIsThereActiveTodo] = useState(false);
  const [isThereCompletedTodos, setIsThereCompletedTodos] = useState(false);
  const [isHidden, setIsHidden] = useState('');
  const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
  const [editTodo, setEditTodo] = useState('');
  const [isThereIssue, setIsThereIssue] = useState(false);

  const changeAll = () => {
    const chnagedArr = todo.map((element) => {
      return {
        ...element,
        completed: !element.completed,
      };
    });

    setTodo(chnagedArr);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
  };

  const searchTodo = async (id: number) => {
    try {
      const updatedTodo = todo.map((obj) => {
        if (obj.id === id) {
          return {
            ...obj,
            completed: !obj.completed,
          };
        }

        return obj;
      });

      setTodo(updatedTodo);

      const todoToUpdate = todo.find((elem) => elem.id === id);

      if (todoToUpdate) {
        await client.patch(`/todos/${id}`, {
          completed: !todoToUpdate.completed,
          title: todoToUpdate.title,
          userId: USER_ID,
          id,
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('There is an issue deleting the todo.');
      setDeleteErrorMessage('Unable to delete a todo');
      setEditTodo('Unable to update a todo');
      setIsThereIssue(true);
    }
  };

  const resetEverything = () => {
    const onlyActives = todo.filter((obj) => {
      return obj.completed === false;
    });

    setTodo(onlyActives);
  };

  let timeoutId: NodeJS.Timeout;

  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      const response = await getTodos(123);

      setTodo(response);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Unable to add a todo');
      setIsHidden('Unable to add a todo');
      setIsThereIssue(true);
      timeoutId = setTimeout(() => {
        setIsThereIssue(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    const isActive = todo.some((obj) => obj.completed === false);
    const isFalse = todo.some((obj) => obj.completed === true);

    setIsThereActiveTodo(isActive);
    setIsThereCompletedTodos(isFalse);
  }, [todo]);

  const visibleTodos: Todo[] = useMemo(() => todo.filter((element) => {
    switch (selectedTab) {
      case SortType.Completed:
        return element.completed;
      case SortType.Active:
        return !element.completed;
      case SortType.All:
        return todo;
      default:
        return todo;
    }
  }), [todo, selectedTab]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <header className="todoapp__header">
            <label htmlFor="nameInput">
              <button
                id="nameInput"
                type="button"
                className={classNames('todoapp__toggle-all', {
                  active: isThereActiveTodo,
                })}
                onClick={changeAll}
              />
            </label>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="todoapp__new-todo"
                placeholder="What needs to be done?"
              />
            </form>
          </header>
          <section className="todoapp__main">
            {todo.length > 0 && (
              <>
                {visibleTodos.map((task) => {
                  if (!isLoading) {
                    return (
                      <div
                        className={classNames('todo', {
                          completed: task.completed,
                        })}
                        key={task.id}
                      >
                        <label className="todo__status-label" key={task.id}>
                          <input
                            type="checkbox"
                            className="todo__status todo__title-field"
                            checked={task.completed}
                            onChange={() => {
                              searchTodo(task.id);
                            }}
                          />
                        </label>
                        <span className="todo__title">
                          {task.title}
                        </span>
                        <button
                          type="button"
                          className="todo__remove"
                        >
                          ×
                        </button>
                        <div className="modal overlay">
                          <div
                            className="modal-background
                             has-background-white-ter"
                          />
                        </div>
                      </div>
                    );
                  }

                  return <div className="loader" key={task.id} />;
                })}
              </>
            )}

          </section>

          {!todo.length && (
            <footer className="todoapp__footer">
              <span className="todo-count">
                0 items left
              </span>

              <nav className="filter">
                <a
                  href="#/"
                  className={classNames('filter__link', {
                    selected: selectedTab === SortType.All,
                  })}
                  onClick={() => setSelectedTab(SortType.All)}
                  role="button"
                >
                  All
                </a>

                <a
                  href="#/active"
                  className={classNames('filter__link', {
                    selected: selectedTab === SortType.Active,
                  })}
                  onClick={() => setSelectedTab(SortType.Active)}
                  role="button"
                >
                  Active
                </a>

                <a
                  href="#/completed"
                  className={classNames('filter__link', {
                    selected: selectedTab === SortType.Completed,
                  })}
                  onClick={() => setSelectedTab(SortType.Completed)}
                  role="button"
                >
                  Completed
                </a>
              </nav>

              {isThereCompletedTodos ? (
                <button
                  type="button"
                  className="todoapp__clear-completed"
                  onClick={resetEverything}
                >
                  Clear completed
                </button>
              ) : <div className="todoapp__filler-div" />}
            </footer>
          )}

        </div>
        <Error
          message={isHidden}
          deleteErrorMessage={deleteErrorMessage}
          isThereIssue={isThereIssue}
          editTodo={editTodo}
          setIsThereIssue={setIsThereIssue}
        />
      </div>

    </>
  );
};
