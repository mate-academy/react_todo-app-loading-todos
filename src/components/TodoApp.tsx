import { useEffect, useState } from 'react';

import { Todo } from '../types/Todo';
import { Notification } from '../types/Notification';
import { Status } from '../types/Status';

import * as TodosService from '../api/todos';

import { UserWarning } from '../UserWarning';
import { TodoHeader } from './todoHeader';
import { TodoFooter } from './TodoFoter';
import { TodoList } from './TodoList';
import { TodoNotificaition } from './TodoNotification';

const USER_ID = 11293;

export const TodoApp = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.ALL);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    TodosService.getTodos(USER_ID)
      .then(setTodos)
      .catch(() => {
        setErrorMessage(Notification.load);
      });
  }, []);

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  }, [errorMessage]);

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case Status.ACTIVE:
        return todo.completed === false;

      case Status.COMPLETED:
        return todo.completed === true;

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
        <TodoHeader />

        <TodoList
          todos={filteredTodos}
        />

        <TodoFooter
          onChangeFilter={setStatus}
          filteredSelected={status}
          todos={todos}
        />
      </div>

      {errorMessage && (
        <TodoNotificaition
          errorMessage={errorMessage}
          setClose={setErrorMessage}
        />
      )}
    </div>
  );
};
