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

  const useFilter = (filter: Status) => {
    setStatus(filter);
  };

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
      case Status.ALL:
        return todos;

      case Status.ACTIVE:
        return !todo.completed;

      case Status.COMPLETED:
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
        <TodoHeader />

        <TodoList
          todos={filteredTodos}
        />

        <TodoFooter
          onChangeFilter={useFilter}
          filteredSelected={status}
          todos={todos}
        />
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {errorMessage && (
        <TodoNotificaition
          errorMessage={errorMessage}
          setClose={setErrorMessage}
        />
      )}
    </div>
  );
};
