/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { FilterStatus, Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { TodoHeader } from './components/TodoHeader';
import { TodoFooter } from './components/TodoFooter';
import { ErrorNotification } from './components/ErrorNotification';

export const App: React.FC = () => {
  const [todosFromServer, setTodosFromServer] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );
  const [todoQuery, setTodoQuery] = useState<string>('');
  const [todoError, setTodoError] = useState<string>('');

  useEffect(() => {
    getTodos()
      .then(todos => {
        setTodosFromServer(todos);
      })
      .catch(error => {
        setTodoError(error.message);
      });
  }, []);

  const filteredTodos = todosFromServer
    .filter(todo => {
      if (filterStatus === FilterStatus.ACTIVE) {
        return !todo.completed;
      }

      if (filterStatus === FilterStatus.COMPLETED) {
        return todo.completed;
      }

      return true;
    })
    .filter(todo => todo.title.toLowerCase().includes(todoQuery.toLowerCase()));

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader query={todoQuery} changeQuery={setTodoQuery} />

        <TodoList filteredTodos={filteredTodos} />

        {/* Hide the footer if there are no todos */}
        {todosFromServer.length !== 0 && (
          <TodoFooter
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            isClearButtonDisabled={
              !todosFromServer.some(todo => todo.completed)
            }
            todosLenght={todosFromServer.filter(todo => !todo.completed).length}
          />
        )}
      </div>
      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <ErrorNotification error={todoError} />
    </div>
  );
};
