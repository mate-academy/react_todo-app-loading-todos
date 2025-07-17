/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { Header } from './components/header';
import { TodoList } from './components/todoList';
import { Footer } from './components/footer';
import { Sort } from './types/Sort';
import { ErrorMassage } from './components/errorMassage';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [userTodo, setUserTodo] = useState<Todo[]>([]);
  const [errorMassage, setErrorMassage] = useState<ErrorMessage | null>(null);
  const [sortTodo, setsortTodo] = useState<Sort>('all');

  useEffect(() => {
    getTodos()
      .then(setUserTodo)
      .catch(() => {
        setErrorMassage(ErrorMessage.Load);
      });
  }, []);

  useEffect(() => {
    if (!errorMassage) {
      return;
    }

    const timer = setTimeout(() => setErrorMassage(null), 3000);

    return () => clearTimeout(timer);
  }, [errorMassage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const sortedUserTodo = userTodo.filter(todo => {
    if (sortTodo === 'active') {
      return todo.completed === false;
    }

    if (sortTodo === 'completed') {
      return todo.completed === true;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList sortedUserTodo={sortedUserTodo} />

        {userTodo.length > 0 && (
          <Footer sort={setsortTodo} userTodo={userTodo} />
        )}
      </div>
      <ErrorMassage errorMassage={errorMassage} massage={setErrorMassage} />
    </div>
  );
};
