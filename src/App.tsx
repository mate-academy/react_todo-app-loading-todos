/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { HeaderTodo } from './components/HeaderTodo';
import { TodoList } from './components/TodoList';
import { FooterTodo } from './components/FooterTodo';
import { TodosError } from './components/TodosError';
import { getTodos } from './api/todos';
import { useTodo } from './providers/AppProvider';

const USER_ID = 11557;

export const App: React.FC = () => {
  const {
    todos, setTodosContext, filterBy, errorTitle, setError, setIsLoadingContext,
  } = useTodo();
  const [active, setActive] = useState<number>(0);

  useEffect(() => {
    const loadTodos = async () => {
      const data = await getTodos(USER_ID);
      const activeQuantity = data
        .filter(todo => todo.completed === false).length;

      setActive(activeQuantity);
      setTodosContext(data, filterBy);
    };

    loadTodos()
      .catch(() => setError('getTodos'))
      .finally(() => setIsLoadingContext(false));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <HeaderTodo />
        <TodoList />

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <FooterTodo
            active={active}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorTitle && <TodosError />}
    </div>
  );
};
