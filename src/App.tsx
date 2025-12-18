/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import {
  addTodos,
  deleteTodos,
  getTodos,
  updateTodos,
  USER_ID,
} from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { TodoHeader } from './components/header/header';
import { TodoMain } from './components/main/main';
import { TodoFooter } from './components/footer/footer';
import { FilterType } from './types/FilterType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingIds, setLoadingIds] = useState<number[]>([]);
  const [title, setTitle] = useState('');
  const [edittingTitle, setEdittingTitle] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);

  const visibleTodos = React.useMemo(() => {
    return todos.filter(todo => {
      switch (filterBy) {
        case FilterType.Active:
          return !todo.completed;
        case FilterType.Completed:
          return todo.completed;
        case FilterType.All:
        default:
          return true;
      }
    });
  }, [todos, filterBy]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorMessage('');
  };

  const handleComplete = (todoToUpdate: Todo) => {
    setLoadingIds(prev => [...prev, todoToUpdate.id]);

    updateTodos({
      userId: USER_ID,
      title: todoToUpdate.title,
      id: todoToUpdate.id,
      completed: !todoToUpdate.completed,
    })
      .then(() =>
        setTodos(prev =>
          prev.map(updatedTodo =>
            updatedTodo.id === todoToUpdate.id
              ? { ...updatedTodo, completed: !updatedTodo.completed }
              : updatedTodo,
          ),
        ),
      )
      .finally(() =>
        setLoadingIds(prev => prev.filter(id => id !== todoToUpdate.id)),
      );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const todoId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    if (!title) {
      setErrorMessage('Title should not be empty');

      return;
    }

    setErrorMessage('');

    addTodos({
      id: todoId,
      title: title.trim(),
      userId: USER_ID,
      completed: false,
    })
      .then(created => {
        setTodos(prev => [...prev, created]);
        setTitle('');
      })
      .catch(error => {
        setErrorMessage('Unable to add todos');
        throw error;
      });
  };

  function loadTodos() {
    getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      });
  }

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (errorMessage === '') {
      return;
    }

    setTimeout(() => setErrorMessage(''), 3000);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleDelete = (todo: Todo) => {
    const todoToDelete = todo.id;

    setLoadingIds(prev => [...prev, todoToDelete]);

    deleteTodos(todoToDelete)
      .then(() =>
        setTodos(prev => prev.filter(prevTodo => prevTodo.id !== todoToDelete)),
      )
      .catch(error => {
        setErrorMessage('Unable to delete a todo');

        setLoadingIds(prev => prev.filter(id => id !== todoToDelete));

        throw error;
      })
      .finally(() =>
        setLoadingIds(prev => prev.filter(id => id !== todoToDelete)),
      );
  };

  const handleToggleAll = () => {
    const statusToSet = !allCompleted;

    const todosToUpdate = todos.filter(todo => todo.completed !== statusToSet);

    if (todosToUpdate.length === 0) {
      return;
    }

    const idsToUpdate = todosToUpdate.map(todo => todo.id);

    setLoadingIds(prev => [...prev, ...idsToUpdate]);

    const promises = todosToUpdate.map(todo =>
      updateTodos({
        userId: USER_ID,
        title: todo.title,
        id: todo.id,
        completed: statusToSet,
      }),
    );

    Promise.all(promises)
      .then(() => {
        setTodos(currentTodos =>
          currentTodos.map(todo => {
            if (idsToUpdate.includes(todo.id)) {
              return { ...todo, completed: statusToSet };
            }

            return todo;
          }),
        );
      })
      .catch(error => {
        setErrorMessage('Unable to update todos');

        throw error;
      })
      .finally(() => {
        setLoadingIds(prev => prev.filter(id => !idsToUpdate.includes(id)));
      });
  };

  const saveTodo = (
    id: number,
    currentTitle: string,
    currentCompleted: boolean,
  ) => {
    const normalizedTitle = edittingTitle.trim();

    if (editingId === null) {
      return;
    }

    if (!normalizedTitle) {
      handleDelete({ id } as Todo);
      setEditingId(null);

      return;
    }

    if (normalizedTitle === currentTitle) {
      setEditingId(null);

      return;
    }

    setLoadingIds(prev => [...prev, id]);

    updateTodos({
      userId: USER_ID,
      title: normalizedTitle,
      id: id,
      completed: currentCompleted,
    })
      .then(() => {
        setTodos(prev =>
          prev.map(todo =>
            todo.id === id ? { ...todo, title: normalizedTitle } : todo,
          ),
        );
        setEditingId(null);
      })
      .catch(() => setErrorMessage('Unable to update a todo'))
      .finally(() => {
        setLoadingIds(prev => prev.filter(loadingId => loadingId !== id));
      });
  };

  const handleKeyUp = (event: React.KeyboardEvent, todo: Todo) => {
    if (event.key === 'Escape') {
      setEditingId(null);
      setEdittingTitle(todo.title);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader
          handleToggleAll={handleToggleAll}
          handleSubmit={handleSubmit}
          handleTitleChange={handleTitleChange}
          allCompleted={allCompleted}
          title={title}
        />

        <TodoMain
          saveTodo={saveTodo}
          handleComplete={handleComplete}
          handleKeyUp={handleKeyUp}
          handleDelete={handleDelete}
          setEdittingTitle={setEdittingTitle}
          setEditingId={setEditingId}
          visibleTodos={visibleTodos}
          edittingTitle={edittingTitle}
          editingId={editingId}
          loadingIds={loadingIds}
        />

        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            handleDelete={handleDelete}
            setFilterBy={setFilterBy}
            filterBy={filterBy}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: errorMessage === '' },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setErrorMessage('')}
        />
        {errorMessage}
      </div>
    </div>
  );
};
