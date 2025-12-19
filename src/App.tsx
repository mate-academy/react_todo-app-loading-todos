/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
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
  const [isDisabledInput, setIsDisabledInput] = useState(false);

  const allCompleted = todos.length > 0 && todos.every(todo => todo.completed);
  const notCompletedTodo = todos.filter(
    todo => !todo.completed && todo.id !== 0,
  ).length;
  const todoInputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    todoInputRef.current?.focus();
  };

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

  const handleComplete = (todoToUpdate: Todo) => {
    setLoadingIds(prev => [...prev, todoToUpdate.id]);

    updateTodos({
      userId: USER_ID,
      title: todoToUpdate.title.trim(),
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
      .catch(() => {
        setErrorMessage('Unable to update a todo');
      })
      .finally(() =>
        setLoadingIds(prev => prev.filter(id => id !== todoToUpdate.id)),
      );
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setErrorMessage('Title should not be empty');

      return;
    }

    const tempoTodo: Todo = {
      id: 0,
      title: trimmedTitle,
      completed: false,
      userId: USER_ID,
    };

    setErrorMessage('');
    setTodos(prev => [...prev, tempoTodo]);
    setLoadingIds(prev => [...prev, tempoTodo.id]);
    setIsDisabledInput(true);

    addTodos({
      title: trimmedTitle,
      userId: USER_ID,
      completed: false,
    })
      .then(createdTodo => {
        setTodos(prev =>
          prev.map(todo => (todo.id === 0 ? createdTodo : todo)),
        );
        setTitle('');
      })
      .catch(() => {
        setErrorMessage('Unable to add a todo');
        setTodos(prev => prev.filter(todo => todo.id !== 0));
        setTitle(trimmedTitle);
      })
      .finally(() => {
        setIsDisabledInput(false);
        setLoadingIds(prev => prev.filter(id => id !== 0));
      });
  };

  function loadTodos() {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
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

  useEffect(() => {
    if (!isDisabledInput) {
      focusInput();
    }
  }, [isDisabledInput]);

  useEffect(() => {
    if (editingId !== null && !loadingIds.includes(editingId)) {
      const editIput =
        document.querySelector<HTMLInputElement>('.todo__title-field');

      editIput?.focus();
    }
  }, [editingId, loadingIds]);

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
      .catch(() => {
        setErrorMessage('Unable to delete a todo');

        setLoadingIds(prev => prev.filter(id => id !== todoToDelete));
      })
      .finally(() => {
        setLoadingIds(prev => prev.filter(id => id !== todoToDelete));
        focusInput();
      });
  };

  const handleToggleAll = () => {
    const statusToSet = !allCompleted;

    const todosToUpdate = todos.filter(todo => todo.completed !== statusToSet);

    if (todosToUpdate.length === 0) {
      return;
    }

    const idsToUpdate = todosToUpdate.map(todo => todo.id);

    setLoadingIds(prev => [...prev, ...idsToUpdate]);
    setErrorMessage('');

    const promises = todosToUpdate.map(todo =>
      updateTodos({
        ...todo,
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
      .catch(() => {
        setErrorMessage('Unable to update a todo');
      })
      .finally(() => {
        setLoadingIds(prev => prev.filter(id => !idsToUpdate.includes(id)));
      });
  };

  const clearCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);

    completedTodos.forEach(todo => {
      setLoadingIds(prev => [...prev, todo.id]);

      deleteTodos(todo.id)
        .then(() => {
          setTodos(prev => prev.filter(t => t.id !== todo.id));
        })
        .catch(() => {
          setErrorMessage('Unable to delete a todo');
        })
        .finally(() => {
          setLoadingIds(prev => prev.filter(id => id !== todo.id));
          focusInput();
        });
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
      setLoadingIds(prev => [...prev, id]);

      deleteTodos(id)
        .then(() => {
          setTodos(prev => prev.filter(t => t.id !== id));
          setEditingId(null);
        })
        .catch(() => {
          setErrorMessage('Unable to delete a todo');
          focusInput();
        })
        .finally(() => {
          setLoadingIds(prev => prev.filter(loadingId => loadingId !== id));
        });

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
      .catch(() => {
        setErrorMessage('Unable to update a todo');
      })
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
          setTitle={setTitle}
          todos={todos}
          todoInputRef={todoInputRef}
          allCompleted={allCompleted}
          title={title}
          isDisabledInput={isDisabledInput}
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
            clearCompleted={clearCompleted}
            setFilterBy={setFilterBy}
            filterBy={filterBy}
            notCompletedTodo={notCompletedTodo}
          />
        )}
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          { hidden: !errorMessage },
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
