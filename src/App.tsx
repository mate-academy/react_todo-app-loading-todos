/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { Todo } from './types/Todo';
import { Footer } from './components/Footer';
import { TodoList } from './components/TodoList';
import { Header, USER_ID } from './components/Header';
import { getTodos } from './api/todos';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then(todosFromserver => (setTodos(todosFromserver)));

    setVisibleTodos(todos);
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const todoFilter = (completed: string | boolean) => {
    if (completed === 'all') {
      setVisibleTodos(visibleTodos);
    } else {
      const newTodos = [...visibleTodos].filter(
        (todo) => todo.completed === completed,
      );

      setVisibleTodos(newTodos);
    }
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header handleSubmit={addTodo} />
        <TodoList todos={visibleTodos} />
        <Footer todos={todos} todoFilter={todoFilter} />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        Unable to load todos
        <br />
        Title should not be empty
        <br />
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
