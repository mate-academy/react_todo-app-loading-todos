/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import cn from 'classnames';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';
import { CompletedStatus } from './types/CompletedStatus';

const getPreparedTodos = (
  todos: Todo[],
  { filterByStatus }: { filterByStatus: CompletedStatus },
) => {
  let preparedTodos = [...todos];

  if (filterByStatus) {
    switch (filterByStatus) {
      case CompletedStatus.Active:
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;

      case CompletedStatus.Completed:
        preparedTodos = preparedTodos.filter(todo => todo.completed);
    }
  }

  return preparedTodos;
};

const countItemsLeft = (todos: Todo[]): number => {
  const items = todos.filter(item => !item.completed);

  return items.length;
};

export const App: React.FC = () => {
  // const todos: Todo[] = getTodos();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [titleField, setTitleField] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterByStatus, setFilterByStatus] = useState<CompletedStatus>(
    CompletedStatus.All,
  );

  const itemsLeft = countItemsLeft(todos);

  const handleError = (errMessage: string) => {
    setErrorMessage(errMessage);

    setTimeout(() => setErrorMessage(''), 3000);
  };

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => handleError('Unable to load todos'));
  }, []);

  const preparedTodos = getPreparedTodos(todos, { filterByStatus });

  if (!USER_ID) {
    return <UserWarning />;
  }

  // const addTodo = (userId: number, title: string, completed: boolean) => {
  //   createTodo({ userId, title, completed }).then(newTodo => {
  //     setTodos(currentTodos => [...currentTodos, newTodo]);
  //   });
  // };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          <button
            type="button"
            className={cn('todoapp__toggle-all', {
              active: todos.every(todo => todo.completed),
            })}
            data-cy="ToggleAllButton"
          />

          {/* Add a todo on form submit */}
          <form>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={event => setTitleField(event.target.value)}
              value={titleField}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          <TodoList todos={preparedTodos} isUpdating={isUpdating} />
        </section>

        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <TodoFooter
            itemsLeft={itemsLeft}
            filterByStatus={filterByStatus}
            onFilterByStatus={setFilterByStatus}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div
        data-cy="ErrorNotification"
        className={cn(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !errorMessage,
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        {errorMessage}
      </div>

      {/* I use setIsUpdate for deploying. it argues on the unused var */}
      {false && setIsUpdating(true)}
    </div>
  );
};
