import React, { useEffect, useState } from 'react';
import { TodoHeader } from './components/TodoHeader';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import classNames from 'classnames';
import { Todo } from './types/Todo';
import * as todosService from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosToDisplay, setTodosToDisplay] = useState<Todo[]>([]);

  const [errorMessage, setErrorMessage] = useState('');

  async function loadTodos() {
    try {
      const currentTodos = await todosService.getTodos();

      setTodos(currentTodos);
      setTodosToDisplay(currentTodos);
    } catch (error) {
      setErrorMessage('Unable to load todos');

      throw error;
    }
  }

  useEffect(() => {
    loadTodos();
    setTimeout(() => setErrorMessage(''), 3000);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader onSetTitleError={setErrorMessage} todos={todos} />

        <TodoList todos={todosToDisplay} />

        {todos.length > 0 && (
          <TodoFooter todos={todos} setTodosToDisplay={setTodosToDisplay} />
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
        {/* show only one message at a time */}
        {/*
        Unable to add a todo
        Unable to delete a todo
        Unable to update a todo */}
      </div>
    </div>
  );
};
