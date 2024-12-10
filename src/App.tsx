/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';

import { UserWarning } from './UserWarning';

import { getTodos, USER_ID } from './api/todos';

import { ErrorMessage } from './types/ErrorMessage';
import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Error } from './components/Error';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterBy>('all');

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>('');

  useEffect(() => {
    getTodos()
      .then(todos => setTodoList(todos))
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      })
      .finally();
  }, []);

  const currentTodoList: Todo[] = todoList.filter(item => {
    return (
      filterBy === 'all' ||
      (filterBy === 'active' && item.completed === false) ||
      (filterBy === 'completed' && item.completed === true)
    );
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={currentTodoList} />

        {/* Hide the footer if there are no todos */}
        {todoList.length > 0 && (
          <Footer
            numOfItems={todoList.filter(el => !el.completed).length}
            filterBy={filterBy}
            setFilterBy={setFilterBy}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error errorMessage={errorMessage} />
    </div>
  );
};
