/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';

import { Todo } from './types/Todo';
import { ErrorMessage } from './types/ErrorMessage';
import { FiltersList } from './types/FiltersList';

import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorBlock } from './components/ErrorBlock';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | ''>('');
  const [filter, setFilter] = useState<FiltersList>(FiltersList.all);
  const itemsLeft = todoList.filter(todo => !todo.completed).length;

  const visibleTodos = todoList.filter(todo => {
    switch (filter) {
      case FiltersList.active:
        return !todo.completed;
      case FiltersList.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const hasCompleted = !todoList.some(todo => todo.completed);

  useEffect(() => {
    getTodos()
      .then(setTodoList)
      .catch(() => setErrorMessage(ErrorMessage.LoadTodos));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => setErrorMessage(''), 3000);

    return () => clearTimeout(timerId);
  }, [errorMessage]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todoList={todoList} />

        {todoList.length > 0 && <TodoList todoList={visibleTodos} />}

        {todoList.length > 0 && (
          <Footer
            itemsLeft={itemsLeft}
            filter={filter}
            setFilter={setFilter}
            hasCompleted={hasCompleted}
          />
        )}
      </div>

      <ErrorBlock
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
