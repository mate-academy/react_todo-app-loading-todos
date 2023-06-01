/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { SortEnum } from './types/sort';

const USER_ID = 1058;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [select, setSelect] = useState('all');
  const [error, setError] = useState(false);
  const lengTodos = todos.filter(todo => todo.completed === false).length;

  const getTodosAll = async () => {
    try {
      const receivedTodos = await getTodos(USER_ID);

      setTodos(receivedTodos);
    } catch {
      setError(true);
    }
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(({ completed }) => {
      switch (select) {
        case SortEnum.ACTIVE:
          return !completed;

        case SortEnum.ALL:
          return !completed || completed;

        case SortEnum.COMPLETED:
          return completed;

        default:
          return !completed || completed;
      }
    });
  }, [todos, select]);

  useEffect(() => {
    getTodosAll();
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList
          todos={filteredTodos}
        />

        <TodoFooter
          select={select}
          setSelect={setSelect}
          todos={filteredTodos}
          lengTodos={lengTodos}
        />
      </div>
      {error && (
        <>
          {/* This todo is being edited */}
          <div className="todo">
            <label className="todo__status-label">
              <input
                type="checkbox"
                className="todo__status"
              />
            </label>

            {/* This form is shown instead of the title and remove button */}
            <form>
              <input
                type="text"
                className="todo__title-field"
                placeholder="Empty todo will be deleted"
                value="Todo is being edited now"
              />
            </form>

            <div className="modal overlay">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>

          {/* This todo is in loadind state */}
          <div className="todo">
            <label className="todo__status-label">
              <input type="checkbox" className="todo__status" />
            </label>

            <span className="todo__title">Todo is being saved now</span>
            <button type="button" className="todo__remove">×</button>

            {/* 'is-active' class puts this modal on top of the todo */}
            <div className="modal overlay is-active">
              <div className="modal-background has-background-white-ter" />
              <div className="loader" />
            </div>
          </div>
        </>
      )}
      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        className="notification is-danger is-light has-text-weight-normal"
        hidden
      >
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
