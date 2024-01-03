/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import * as todosService from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

const USER_ID = 11678;

enum StatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [noCheckedTodosLength, setNoCheckedTodosLength] = useState(0);

  const [
    selectTodoFilteredList,
    setSelectTodoFilteredList,
  ] = useState(StatusFilter.ALL);

  useEffect(() => {
    if (USER_ID) {
      todosService.getTodos(USER_ID).then(tod => {
        setTodos(tod);
        setNoCheckedTodosLength(tod.filter(
          (t) => t.completed !== true,
        ).length);
      }).catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
    }
  }, []);

  if (!USER_ID) {
    <UserWarning />;
  }

  const filterTodos = useMemo(() => {
    return todos.filter((todo) => {
      const { completed } = todo;

      switch (selectTodoFilteredList) {
        case StatusFilter.ALL: return true;
        case StatusFilter.ACTIVE: return !completed;
        case StatusFilter.COMPLETED: return completed;
        default: return true;
      }
    });
  }, [todos, selectTodoFilteredList]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          title={title}
          onSetTitle={setTitle}
          onTitleError={setErrorMessage}
        />

        {
          todos.length > 0 && (
            <Main
              todos={filterTodos}
            />
          )
        }

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            countTodos={noCheckedTodosLength}
            selectTodoFilteredList={selectTodoFilteredList}
            setSelectTodoFilteredList={setSelectTodoFilteredList}
          />
        )}
      </div>

      <div
        data-cy="ErrorNotification"
        className={`notification is-danger is-light has-text-weight-normal
          ${!errorMessage && 'hidden'}`}
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
