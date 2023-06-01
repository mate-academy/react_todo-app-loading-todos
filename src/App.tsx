/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { SortEnum } from './types/sort';

const USER_ID = 10589;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [select, setSelect] = useState('all');
  const [isError, setIsError] = useState(false);
  // const [isDeleteError, setDeleteIsError] = useState(false);
  const lengTodos = todos.filter(todo => !todo.completed).length;

  const getTodosAll = async () => {
    try {
      const receivedTodos = await getTodos(USER_ID);

      setTodos(receivedTodos);
    } catch {
      setIsError(true);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (select) {
      case SortEnum.ACTIVE:
        return todos.filter(({ completed }) => !completed);

      case SortEnum.ALL:
        return todos;

      case SortEnum.COMPLETED:
        return todos.filter(({ completed }) => completed);

      default:
        return todos;
    }
  }, [todos, select]);

  useEffect(() => {
    getTodosAll();
  }, []);

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
          select={select}
          setSelect={setSelect}
          todos={filteredTodos}
          lengTodos={lengTodos}
        />
      </div>
      {isError && (
        <div
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            type="button"
            className="delete"
          />
          Unable to add a todo
          <br />
          Unable to delete a todo
          <br />
          Unable to update a todo
        </div>
      )}

    </div>
  );
};
