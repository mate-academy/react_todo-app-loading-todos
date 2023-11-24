/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { StatusFilter, Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import {
  ErrorNotification,
} from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { handleErrorMessage } from './components/function/handleErrorMessage ';

const USER_ID = 11956;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [
    errorNotification,
    setErrorNotification,
  ] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>(StatusFilter.All);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setErrorNotification(null);

        const todoList = await getTodos(USER_ID);

        setTodos(todoList);
      } catch (error) {
        handleErrorMessage(error, setErrorNotification);
      }
    };

    fetchTodos();

    const errorNotificationTimeout = setTimeout(() => {
      setErrorNotification(null);
    }, 3000);

    return () => {
      clearTimeout(errorNotificationTimeout);
    };
  }, []);

  const filteredTodos = todos
    ? todos.filter((todo) => {
      if (filter === StatusFilter.All) {
        return true;
      }

      if (filter === StatusFilter.Active) {
        return !todo.completed;
      }

      return todo.completed;
    })
    : null;

  const incompleteTodosCount = todos
    ? todos.reduce(
      (count, todo) => (!todo.completed ? count + 1 : count), 0,
    )
    : 0;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            type="button"
            className="todoapp__toggle-all active"
            data-cy="ToggleAllButton"
          />

          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList filteredTodos={filteredTodos || []} />

        <Footer
          incompleteTodosCount={incompleteTodosCount}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <ErrorNotification
        errorNotification={errorNotification}
        setErrorNotification={setErrorNotification}
      />

    </div>
  );
};
