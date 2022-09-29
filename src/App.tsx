/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoFooter } from './components/Auth/todos/TodoFooter';
import { TodoHeader } from './components/Auth/todos/TodoHeader';
import { TodoList } from './components/Auth/todos/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [todos, setTodos] = useState<Todo[]>([]);

  const addData = async () => {
    if (user) {
      setTodos(await getTodos(user?.id));
    }
  };

  useEffect(() => {
    addData();
  }, []);

  // const addTodo = async () => {
  //   if (user) {
  //     await postTodo(user?.id, 'copleted');
  //     console.log('posted');
  //   }
  // };

  console.log(todos);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList todos={todos} />

        <TodoFooter />
      </div>

      {/* ↓↓↓ I use this code in the following tasks ↓↓↓ */}

      {/* <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
          onClick={() => addTodo()}
        />

        Unable to add a todo
        <br />
        Unable to delete a todo
        <br />
        Unable to update a todo
      </div> */}
    </div>
  );
};
