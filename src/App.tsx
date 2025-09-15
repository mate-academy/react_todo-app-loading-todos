/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import * as postService from './api/todos';
import { Todo } from './types/Todo';
import classNames from 'classnames';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { SelectFilterValue } from './types/SelectFilterValue';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectValue, setSelectValue] = useState<SelectFilterValue>(
    SelectFilterValue.All,
  );
  const [count, setCount] = useState(0);

  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      titleField.current.focus();
    }
  }, [loading]);

  function getTodos() {
    setErrorMessage('');
    setLoading(true);

    return postService
      .getTodos()
      .then(setTodos)
      .catch(error => {
        setErrorMessage('Unable to load todos');
        throw error;
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    setCount(todos.filter(todo => todo.completed === false).length);
  }, [todos]);

  const filteredTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => {
      if (selectValue === 'active') {
        return !todo.completed;
      }

      if (selectValue === 'completed') {
        return todo.completed;
      }

      return true;
    });
  }, [todos, selectValue]);

  function toggleTodo(id: number) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }

  if (!USER_ID) {
    return <UserWarning />;
  }

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTodoTitle(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (loading) {
      return;
    }

    if (todoTitle.trim().length === 0) {
      setErrorMessage('Title should not be empty');

      return;
    }

    return;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          todos={todos}
          handleSubmit={handleSubmit}
          titleField={titleField}
          todoTitle={todoTitle}
          handleInput={handleInput}
          loading={loading}
        />
        <TodoList filteredTodos={filteredTodos} onToggle={toggleTodo} />

        {todos.length !== 0 && (
          <Footer
            todos={todos}
            count={count}
            selectValue={selectValue}
            setSelectValue={setSelectValue}
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
          onClick={() => {
            setErrorMessage('');
          }}
        />
        {errorMessage}
      </div>
    </div>
  );
};
