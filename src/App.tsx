/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoHeader } from './components/TodoHeader/TodoHeader';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);

  // const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader />

        <TodoList />

        <TodoFooter />
      </div>

      {/* <div
        data-cy="ErrorNotification"
        className="notification is-danger is-light has-text-weight-normal"
      >
        <button
          data-cy="HideErrorButton"
          type="button"
          className="delete"
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
