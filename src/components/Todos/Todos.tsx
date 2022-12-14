/* eslint-disable jsx-a11y/control-has-associated-label */
import  { FC, useEffect, useState } from 'react';
import { getTodos } from '../../api/todos';
import { Status } from '../../types/Status';
import { Todo } from '../../types/Todo';
import { useAuthContext } from '../Auth/AuthContext';
import { TodoFilter } from '../TodoFilter/TodoFilter';

import { TodoList } from '../TodoList/TodoList';

export const Todos: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Status>(Status.All);
  const authUser = useAuthContext();

  const loadTodos = async () => {
    if (!authUser) {
      return;
    }

    const todosFromServer = await getTodos(authUser.id);

    setTodos(todosFromServer);
  };

  useEffect(() => {
    loadTodos();
  }, [authUser]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <button
            data-cy="ToggleAllButton"
            type="button"
            className="todoapp__toggle-all active"
          />
          {/* <TodoForm /> */}
        </header>
        <TodoList todos={todos} />

        <footer className="todoapp__footer" data-cy="Footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${todos.length} items left`}
          </span>

          <TodoFilter
            status={status}
            onStatusChange={setStatus}
          />

        </footer>
      </div>
    </div>
  );
};
