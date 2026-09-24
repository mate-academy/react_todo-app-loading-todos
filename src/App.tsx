/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import { UserWarning } from './UserWarning';
import {
  addTodos,
  changeTodos,
  deleteTodos,
  editTodos,
  getTodos,
  USER_ID,
} from './api/todos';

import { FilterType, Todo } from './types/Todo';

import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './components/Filter/Filter';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const [loadingTodoId, setLoadingTodoId] = useState<number | null>(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingClear, setLoadingClear] = useState(false);
  const [loadingToggleAll, setLoadingToggleAll] = useState(false);

  const showError = (message: string) => {
    setError(message);

    setTimeout(() => {
      setError('');
    }, 3000);
  };

  const hideError = () => {
    setError('');
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        showError('Unable to load todos');
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  const toggleTodo = (todo: Todo) => {
    if (
      loadingTodoId !== null ||
      loadingAdd ||
      loadingClear ||
      loadingToggleAll
    ) {
      return;
    }

    hideError();
    setLoadingTodoId(todo.id);

    changeTodos(todo)
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        showError('Unable to update a todo');
      })
      .finally(() => {
        setLoadingTodoId(null);
      });
  };

  const handleToggleAll = () => {
    if (
      loadingTodoId !== null ||
      loadingAdd ||
      loadingClear ||
      loadingToggleAll ||
      todos.length === 0
    ) {
      return;
    }

    const shouldCompleteAll = todos.some(todo => !todo.completed);

    const todosToChange = todos.filter(
      todo => todo.completed !== shouldCompleteAll,
    );

    hideError();
    setLoadingToggleAll(true);

    Promise.all(todosToChange.map(todo => changeTodos(todo)))
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        showError('Unable to update todos');
      })
      .finally(() => {
        setLoadingToggleAll(false);
      });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      showError('Title should not be empty');

      return;
    }

    if (
      loadingTodoId !== null ||
      loadingAdd ||
      loadingClear ||
      loadingToggleAll
    ) {
      return;
    }

    hideError();
    setLoadingAdd(true);

    addTodos(trimmedTitle)
      .then(() => getTodos())
      .then(setTodos)
      .then(() => {
        setTitle('');
      })
      .catch(() => {
        showError('Unable to add a todo');
      })
      .finally(() => {
        setLoadingAdd(false);
      });
  };

  const handleEditClick = (todo: Todo) => {
    if (
      loadingTodoId !== null ||
      loadingAdd ||
      loadingClear ||
      loadingToggleAll
    ) {
      return;
    }

    hideError();
    setEditTitle(todo.title);
    setEdit(todo.id);
  };

  const handleEdit = (todo: Todo) => {
    if (
      loadingTodoId !== null ||
      loadingAdd ||
      loadingClear ||
      loadingToggleAll
    ) {
      return;
    }

    const trimmedTitle = editTitle.trim();

    hideError();
    setLoadingTodoId(todo.id);

    if (!trimmedTitle) {
      deleteTodos(todo)
        .then(() => getTodos())
        .then(setTodos)
        .then(() => {
          setEdit(null);
          setEditTitle('');
        })
        .catch(() => {
          showError('Unable to delete a todo');
        })
        .finally(() => {
          setLoadingTodoId(null);
        });

      return;
    }

    editTodos(todo, trimmedTitle)
      .then(() => getTodos())
      .then(setTodos)
      .then(() => {
        setEdit(null);
        setEditTitle('');
      })
      .catch(() => {
        showError('Unable to update a todo');
      })
      .finally(() => {
        setLoadingTodoId(null);
      });
  };

  const handleDelete = (todo: Todo) => {
    if (
      loadingTodoId !== null ||
      loadingAdd ||
      loadingClear ||
      loadingToggleAll
    ) {
      return;
    }

    hideError();
    setLoadingTodoId(todo.id);

    deleteTodos(todo)
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        showError('Unable to delete a todo');
      })
      .finally(() => {
        setLoadingTodoId(null);
      });
  };

  const handleClearCompleted = () => {
    if (
      loadingTodoId !== null ||
      loadingAdd ||
      loadingClear ||
      loadingToggleAll
    ) {
      return;
    }

    const completedTodos = todos.filter(todo => todo.completed);

    if (completedTodos.length === 0) {
      return;
    }

    hideError();
    setLoadingClear(true);

    Promise.all(completedTodos.map(todo => deleteTodos(todo)))
      .then(() => getTodos())
      .then(setTodos)
      .catch(() => {
        showError('Unable to delete a todo');
      })
      .finally(() => {
        setLoadingClear(false);
      });
  };

  const handleFilter = (
    event: React.MouseEvent<HTMLAnchorElement>,
    newFilter: FilterType,
  ) => {
    event.preventDefault();
    setFilter(newFilter);
  };

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: allCompleted,
            })}
            data-cy="ToggleAllButton"
            onClick={handleToggleAll}
            disabled={
              loadingTodoId !== null ||
              loadingAdd ||
              loadingClear ||
              loadingToggleAll ||
              todos.length === 0
            }
          />

          <NewTodo
            title={title}
            setTitle={setTitle}
            handleSubmit={handleSubmit}
            loadingAdd={loadingAdd}
          />
        </header>

        {todos.length > 0 && (
          <TodoList
            edit={edit}
            editTitle={editTitle}
            visibleTodos={visibleTodos}
            toggleTodo={toggleTodo}
            loadingTodoId={loadingTodoId}
            loadingClear={loadingClear}
            handleEdit={handleEdit}
            setEditTitle={setEditTitle}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodosCount} items left
            </span>

            <Filter filter={filter} handleFilter={handleFilter} />

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              disabled={
                !todos.some(todo => todo.completed) ||
                loadingClear ||
                loadingToggleAll
              }
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={hideError}
        />

        {error}
      </div>
    </div>
  );
};
