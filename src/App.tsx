/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorComponent } from './components/ErrorComponent/ErrorComponent';
import { Footer } from './components/Footer/Footer';
import { FilterStatusType } from './types/FilterStatusType';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterStatus, setFilterStatus] = useState(FilterStatusType.All);
  const [isCompletedTodosExist, setIsCompletedTodosExist] = useState(true);
  const [numberOfNotCompletedTodos, setNumberOfNotCompletedTodos] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (showError) {
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  }, [showError]);

  useEffect(() => {
    if (todos.some(todo => todo.completed)) {
      setIsCompletedTodosExist(true);
    } else {
      setIsCompletedTodosExist(false);
    }

    let counter = 0;

    for (const todo of todos) {
      if (!todo.completed) {
        counter++;
      }
    }

    setNumberOfNotCompletedTodos(counter);
  }, [todos]);

  useEffect(() => {
    if (filterStatus === FilterStatusType.All) {
      setVisibleTodos(todos);
    } else if (filterStatus === FilterStatusType.Active) {
      setVisibleTodos(todos.filter(todo => !todo.completed));
    } else {
      setVisibleTodos(todos.filter(todo => todo.completed));
    }
  }, [filterStatus, todos]);

  useEffect(() => {
    getTodos()
      .then(todosFromServer => {
        setTodos(todosFromServer);
        setShowError(false);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setShowError(true);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList todos={visibleTodos} />
        {todos.length > 0 && (
          <Footer
            setFilterStatus={setFilterStatus}
            filterStatus={filterStatus}
            isCompletedTodosExist={isCompletedTodosExist}
            numberOfNotCompletedTodos={numberOfNotCompletedTodos}
          />
        )}
      </div>

      <ErrorComponent errorMessage={errorMessage} showError={showError} />
      {/* 'Title should not be empty'
          'Unable to add a todo'
          'Unable to delete a todo'
          'Unable to update todos' */}
    </div>
  );
};
