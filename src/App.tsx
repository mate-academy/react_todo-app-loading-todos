/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useMemo, useState } from 'react';
import cn from 'classnames';
import { UserWarning } from './UserWarning';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import * as todoService from './api/todos';
import { Todo } from './types/Todo';
import { TodosFilter } from './types/TodosFilter';
import { getFilteredTodos } from './utils/getFilteredTodos';
import { getUncompletedTodos } from './utils/getUncompletedTodos';

export const USER_ID = 11513;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(TodosFilter.All);
  const [errorMessage, setErrorMessage] = useState('');
  const [isErrorShown, setIsErrorShown] = useState(false);

  const uncopmletedTodos = getUncompletedTodos(todos);

  useEffect(() => {
    todoService.getTodos(USER_ID)
      .then(setTodos)
      .catch((error) => {
        setErrorMessage('Unable to load todos');
        setIsErrorShown(true);
        throw error;
      });

    setTimeout(() => {
      setIsErrorShown(false);
    }, 3000);
  }, []);

  const filteredTodos = useMemo(() => {
    return getFilteredTodos(todos, filter);
  }, [todos, filter]);

  // function addTodo({ title, userId = USER_ID, completed = false }: Todo) {
  //   setErrorMessage('');

  //   return todoService.addTodo({ title, userId, completed })
  //     .then(newTodo => {
  //       setTodos(currentTodos => [...currentTodos, newTodo]);
  //     })
  //     .catch(error => {
  //       setErrorMessage('Unable to add a todo');
  //       throw error;
  //     });
  // }

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoForm />
        <TodoList todos={filteredTodos} />
        {Boolean(todos.length) && (
          <TodoFilter
            filter={filter}
            uncopmletedTodos={uncopmletedTodos}
            onFilterChange={setFilter}
          />
        )}
      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}

      <div className={cn(
        'notification is-danger is-light has-text-weight-normal', {
          hidden: !isErrorShown,
        },
      )}
      >
        <button
          type="button"
          className="delete"
          onClick={() => setIsErrorShown(false)}
        />

        {errorMessage}

        {/* show only one message at a time */}
        {/* Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo */}
      </div>

    </div>
  );
};
