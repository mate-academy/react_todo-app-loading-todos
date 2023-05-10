/* eslint-disable jsx-a11y/control-has-associated-label */
import { FC, useEffect, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { BottomPanel } from './components/BottomPanel';
import { Status } from './types/StatusEnum';

const USER_ID = 10268;

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [statusOfTodo, setStatusOfTodo] = useState<string>(Status.ALL);

  const changeStatusOfTodo = (status: string) => {
    setStatusOfTodo(status);
  };

  // const filterTodos = () => {};

  useEffect(() => {
    const loadTodoFromServer = async () => {
      const todosFromServer = await getTodos(USER_ID);

      setTodos(todosFromServer);
    };

    loadTodoFromServer();
  }, []);

  // const visibleTodos = filterTodos(todos , statusOfTodo);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {/* this buttons is active only if there are some active todos */}
          <button type="button" className="todoapp__toggle-all active" />

          {/* Add a todo on form submit */}
          <form>
            <input
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>
        {todos
          && (
            <>
              <TodoList todos={todos} />
              <BottomPanel
                countOfItems={todos.length}
                selectedStatus={statusOfTodo}
                changeStatusOfTodo={changeStatusOfTodo}
              />
            </>
          ) }

      </div>

      {/* Notification is shown in case of any error */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <div className="notification is-danger is-light has-text-weight-normal">
        <button type="button" className="delete" />

        {/* show only one message at a time */}
        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div>
    </div>
  );
};
