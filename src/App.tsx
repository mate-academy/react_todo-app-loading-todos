/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { TodoItem } from './components/TodoItem';
import { Todo } from './types/Todo';
import { TodoFooter } from './components/TodoFooter';
import { Notification } from './components/Notification';
import { TodoHeader } from './components/TodoHeader';
import { Status } from './types/Status';

enum ErrorMessage {
  LOAD_TODOS = 'Unable to load todos',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [status, setStatus] = useState<Status>('all');

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => setErrorMessage(ErrorMessage.LOAD_TODOS))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = window.setTimeout(() => setErrorMessage(''), 3000);

    return () => window.clearTimeout(timerId);
  }, [errorMessage]);

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader todos={todos} />

        {todos.length > 0 && !isLoading && (
          <>
            <section className="todoapp__main" data-cy="TodoList">
              {filteredTodos.map(todo => (
                <TodoItem todo={todo} key={todo.id} />
              ))}
            </section>
            <TodoFooter
              todos={todos}
              selectedFilter={status}
              onSelected={setStatus}
              onReset={() => {}}
            />
          </>
        )}
      </div>

      <Notification
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
    </div>
  );
};
