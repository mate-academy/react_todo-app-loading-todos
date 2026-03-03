/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { TODO_STATUS, TodoStatus } from './types/TodoStatus';

import { ErrorNotification } from './components/ErrorNotification';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { TodoHeader } from './components/TodoHeader';
import { ErrorMessage } from './types/ErrorMessage';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoQuery, setTodoQuery] = useState('');

  const [todosStatusFilter, setTodoStatusFilter] = useState<TodoStatus>(
    TODO_STATUS.ALL,
  );
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
      })
      .catch(() => {
        setErrorMessage(ErrorMessage.LoadTodos);
      });
  }, []);

  useEffect(() => {
    if (!errorMessage) {
      return;
    }

    const timerId = setTimeout(() => {
      setErrorMessage(null);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [errorMessage]);

  const {
    active: todosActiveCount,
    completed: todosCompletedCount,
    filtered: filteredTodos,
  } = todos.reduce(
    (acc, todo) => {
      const active = acc.active + (todo.completed ? 0 : 1);
      const completed = acc.completed + (todo.completed ? 1 : 0);

      const shouldInclude =
        todosStatusFilter === TODO_STATUS.ALL ||
        (todosStatusFilter === TODO_STATUS.ACTIVE && !todo.completed) ||
        (todosStatusFilter === TODO_STATUS.COMPLETED && todo.completed);

      return {
        active,
        completed,
        filtered: shouldInclude ? [...acc.filtered, todo] : acc.filtered,
      };
    },
    { active: 0, completed: 0, filtered: [] as Todo[] },
  );

  const isAllCompleted =
    todos.length > 0 && todos.length === todosCompletedCount;

  const handleSelectTodoStatus = (todoStatus: TodoStatus) => {
    setTodoStatusFilter(todoStatus);
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <>
      <div className="todoapp">
        <h1 className="todoapp__title">todos</h1>

        <div className="todoapp__content">
          <TodoHeader
            newTodoQuery={todoQuery}
            onNewTodoQueryChange={setTodoQuery}
            isAllCompleted={isAllCompleted}
          />

          {filteredTodos.length > 0 && <TodoList todos={filteredTodos} />}
          {todos.length > 0 && (
            <TodoFooter
              todosActiveCount={todosActiveCount}
              todosStatusFilter={todosStatusFilter}
              onSelectStatusFilter={handleSelectTodoStatus}
              disableClearCompletedBtn={todosCompletedCount === 0}
            />
          )}
        </div>

        <ErrorNotification
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      </div>
    </>
  );
};
