/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import type { Todo } from './types/Todo';
import { FilterBtn } from './types/Filter';
import * as postService from './api/todos';
import classNames from 'classnames';
import { Header } from './components/Header/Header';
import { MainList } from './components/MainList/MainList';
import { FooterList } from './components/FooterList/FooterList';

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [value, setValue] = useState<string>('');
  const [filter, setFilter] = useState<FilterBtn>(FilterBtn.All);
  const [editField, setEditField] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [editValue, setEditValue] = useState<string>('');
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  /* use Effects */
  useEffect(() => {
    getTodos()
      .then(setTodosList)
      .catch(() => {
        setLoadingError('Unable to load todos');
      });
  }, []);

  useEffect(() => {
    if (editField !== null) {
      inputRef.current?.focus();
    }
  }, [editField]);

  useEffect(() => {
    if (loadingError === null) {
      return;
    }

    const timer = setTimeout(() => {
      setLoadingError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [loadingError]);
  /* end of use Effects */

  if (!USER_ID) {
    return <UserWarning />;
  }

  function deleteTodo(todoId: number) {
    return postService
      .deleteTodo(todoId)
      .then(() => {
        setTodosList(currentTodo =>
          currentTodo.filter(todo => todo.id !== todoId),
        );
      })
      .catch(() => setLoadingError('Unable to delete a todo'));
  }

  function addTodo({ completed, title, userId }: Omit<Todo, 'id'>) {
    setLoading(true);

    return postService
      .createTodo({ completed, title, userId })
      .then(newTodo => {
        setTodosList(currentTodos => [...currentTodos, newTodo]);
        setValue('');
      })
      .catch(() => {
        setLoadingError('Unable to add a todo');
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function updateTodo(updateTodoData: Todo) {
    return postService
      .updateTodo(updateTodoData)
      .then(updatedPost => {
        setTodosList(currentTodo => {
          const newTodos = [...currentTodo];
          const index = newTodos.findIndex(
            post => post.id === updateTodoData.id,
          );

          newTodos.splice(index, 1, updatedPost);

          return newTodos;
        });
      })
      .catch(() => setLoadingError('Unable to update a todo'));
  }

  const displayedTodos =
    filter === FilterBtn.Active
      ? todosList.filter(item => !item.completed)
      : filter === FilterBtn.Completed
        ? todosList.filter(item => item.completed)
        : todosList;

  const allCompleted =
    todosList.length > 0 && todosList.every(item => item.completed);

  function deleteCompletedTodos(): void {
    displayedTodos
      .filter(item => item.completed)
      .forEach(item => deleteTodo(item.id));
  }

  const handleSave = async (item: Todo) => {
    setEditField(null);

    return updateTodo({ ...item, title: editValue });
  };

  const editHandle = async (item: Todo) => {
    if (editField === item.id) {
      setLoadingId(item.id);
      try {
        if (editValue.trim() !== '') {
          await handleSave(item);
        } else {
          await deleteTodo(item.id);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error:', error);
      } finally {
        setLoadingId(null);
      }
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          onVal={value}
          onChangeVal={setValue}
          onTodoList={setTodosList}
          todosItemsList={todosList}
          onUpdate={updateTodo}
          onAdd={addTodo}
          onError={setLoadingError}
          onAllItems={allCompleted}
        />

        <MainList
          shownTodos={displayedTodos}
          onUpdate={updateTodo}
          editFieldVal={editField}
          onEditFieldVal={setEditField}
          editInputVal={editValue}
          onEditInputVal={setEditValue}
          onEditHandle={editHandle}
          onDelete={deleteTodo}
          loadId={loadingId}
          onLoadId={setLoadingId}
          load={loading}
          inputMainFocus={inputRef}
        />

        <FooterList
          todosItemsList={todosList}
          filtered={filter}
          onFiltred={setFilter}
          onDeleteAll={deleteCompletedTodos}
        />
      </div>
      <div
        data-cy="ErrorNotification"
        className={classNames(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: loadingError === null,
          },
        )}
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => setLoadingError(null)}
        />
        {/* show only one message at a time */}
        {loadingError}
      </div>
    </div>
  );
};
