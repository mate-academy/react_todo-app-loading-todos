/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList/TodoList';
import { TodoFooter } from './components/TodoFooter/TodoFooter';
import { TodoHeader } from './components/TodoHeader/TodoHeader';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { LoadingError } from './components/LoadingError/LoadingError';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodo, setFilterTodo] = useState('all');
  const [error, setError] = useState<boolean>(false);
  const [userID] = useState(0);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodos(userID)
      .then(setTodos)
      .catch(() => setError(true));
  }, []);

  const filterTodos = todos.filter(item => {
    if (filterTodo === 'active') {
      return !item.completed;
    }

    if (filterTodo === 'completed') {
      return item.completed;
    }

    return item;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodoHeader newTodoField={newTodoField} />

        {(todos.length > 0) && (
          <TodoList todos={filterTodos} />
        )}

        <TodoFooter
          filterTodos={filterTodos}
          filterTodo={filterTodo}
          setFilterTodo={setFilterTodo}
        />
      </div>

      {error && (
        <LoadingError
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};
