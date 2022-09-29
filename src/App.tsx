/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
} from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';
import Header from './components/Header';
import TodoList from './components/TodoList';
import ErrorNotification from './components/ErrorNotification';
import Footer from './components/Footer';
import { AuthContext } from './components/Auth/AuthContext';

export const App: React.FC = () => {
  const [error, setError] = useState(false);
  const [errorText] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [todos, setTodos] = useState<Todo[]>([]);
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  let userId = 0;

  if (user?.id) {
    userId = user?.id;
  }

  getTodos(userId)
    .then(setTodos)
    .catch(() => setError(false));

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  const visibleTodos = todos.filter(todo => {
    switch (filterType) {
      case FilterType.Active:
        return !todo.completed;

      case FilterType.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} newTodoField={newTodoField} />

        {todos.length > 0 && (
          <TodoList todos={visibleTodos} />
        )}

        <Footer
          todos={todos}
          filterType={filterType}
          setFilterType={setFilterType}
        />
      </div>

      <ErrorNotification
        error={error}
        setError={setError}
        errorText={errorText}
      />
    </div>
  );
};
