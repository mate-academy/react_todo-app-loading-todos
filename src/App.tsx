/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Message } from './components/ErrorMessage';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';

const USER_ID = 10910;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedNav, setSelectedNav] = useState('All');
  const [visibleError, setVisibleError] = useState('');

  if (!USER_ID) {
    return <UserWarning />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos)
      .catch(() => setVisibleError('Unable to load a todos'));
  }, []);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  let visibleTodos = useMemo<Todo[]>(() => todos, [todos]);

  switch (selectedNav) {
    case 'Active':
      visibleTodos = visibleTodos.filter(todo => todo.completed === false);
      break;

    case 'Completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed === true);
      break;

    default:
      break;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList visibleTodos={visibleTodos} />

        {/* Hide the footer if there are no todos */}
        <TodoFooter
          visibleTodos={visibleTodos}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
        />
      </div>

      <Message visibleError={visibleError} setVisibleError={setVisibleError} />
    </div>
  );
};
