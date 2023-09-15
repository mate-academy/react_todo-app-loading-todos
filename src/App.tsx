/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useEffect,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Input } from './components/Input/Input';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer';
import { FilterType } from './types/FilterType';
import { CaseOfErrorMessage } from './components/CaseOfErrorMessage';
import { Errors } from './types/Erros';

const USER_ID = 11433;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<Errors | null>(null);
  const [filterTodos, setFilterTodos]
    = useState<FilterType>('all');

  const handleShowError = (err: Errors) => {
    setError(err);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  useEffect(() => {
    getTodos(USER_ID)
      .then((data) => {
        setTodos(data);
      })
      .catch(() => {
        handleShowError(Errors.Update);
      });
  }, [todos]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSetFilterTodos = (filterType: FilterType) => {
    setFilterTodos(filterType);
  };

  const closeErrorMessage = () => {
    setError(null);
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Input />
        {todos && <TodoList todos={todos} filterTodos={filterTodos} />}

        {/* Hide the footer if there are no todos */}
        {todos.length !== 0
          && (
            <Footer
              handleSetFilterTodos={handleSetFilterTodos}
              todos={todos}
            />
          )}
      </div>
      {error && (
        <CaseOfErrorMessage
          error={error}
          closeErrorMessage={closeErrorMessage}
        />
      )}
    </div>
  );
};
