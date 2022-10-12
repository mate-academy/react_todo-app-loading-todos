/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { Footer } from './components/Auth/todos/Footer';
import { Header } from './components/Auth/todos/Header';
import { TodoList } from './components/Auth/todos/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);

  const [addError, setAddError] = useState(true);
  const [deleteError, setDeleteError] = useState(false);
  const [updateError, setUpdateError] = useState(false);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState('All');

  const hasError = (isVisible?: boolean) => {
    if (isVisible === false) {
      setAddError(false);
      setDeleteError(false);
      setUpdateError(false);
    }

    return addError || deleteError || updateError;
  };

  const addData = async () => {
    if (user) {
      const temp = await getTodos(user?.id);

      setTodos(temp);
      setVisibleTodos(temp);
    }
  };

  const filterByStatus = (activedStatus: string): Todo[] => {
    switch (activedStatus) {
      case 'Active':
        return todos.filter(todo => !todo.completed);

      case 'Completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  useEffect(() => {
    addData();
  }, []);

  useEffect(() => {
    setVisibleTodos(filterByStatus(status));
  }, [status]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList todos={visibleTodos} />

        <Footer
          todos={todos}
          selected={status}
          setStatus={setStatus}
        />
      </div>

      {hasError() && (
        <div
          data-cy="ErrorNotification"
          className="notification is-danger is-light has-text-weight-normal"
        >
          <button
            data-cy="HideErrorButton"
            type="button"
            className="delete"
            onClick={() => hasError(false)}
          />
          {addError && 'Unable to add a todo'}
          <br />
          {deleteError && 'Unable to delete a todo'}
          <br />
          {updateError && 'Unable to update a todo'}
        </div>
      )}
    </div>
  );
};
