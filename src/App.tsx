/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Filter } from './types/Filter';
import { ErrorAction } from './types/ErrorAction';
import { Notification } from './components/Notification';

const USER_ID = 6655;

function filteredTodos(todos:Todo[], filter:Filter) {
  const returnArr = [...todos];

  switch (filter) {
    case Filter.ACTIVE:
      return returnArr.filter(todo => !todo.completed);
    case Filter.COMPLETED:
      return returnArr.filter(todo => todo.completed);
    default:
      return returnArr;
  }
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<Filter>(Filter.ALL);
  const [errorMessage, setErrorMessage] = useState<ErrorAction>('');
  const visibleTodos = filteredTodos(todos, filterBy);
  const todosLeft = todos.filter(todoLeft => !todoLeft.completed).length;

  useEffect(() => {
    getTodos(USER_ID)
      .then(result => {
        setTodos(result);
      })
      .catch(() => {
        setErrorMessage('load');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={visibleTodos} />
        {todos.length > 0 && (
          <Footer
            setFilterBy={setFilterBy}
            filter={filterBy}
            todosLeft={todosLeft}
          />
        )}
      </div>
      <Notification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />

    </div>
  );
};
