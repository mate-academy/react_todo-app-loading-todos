/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { ErrorMessage }
  from './components/ErrorMessage/Error';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { FilterType } from './types/Filter';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<FilterType>('All');
  const [error, setError] = useState('');

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getTodos(user.id)
        .then(setTodos)
        .catch(() => setError('Something went wrong'));
    }
  }, []);

  const activeTodosAmount = useMemo(() => (
    todos.filter(todo => !todo.completed).length
  ), [todos]);

  const isTodoCompleted = useMemo(() => (
    todos.some(todo => todo.completed)
  ), [todos]);

  const filteredTodos = todos.filter(todo => {
    switch (filterType) {
      case 'Completed':
        return todo.completed;

      case 'Active':
        return !todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0
          && (
            <Footer
              activeTodosAmount={activeTodosAmount}
              isTodoCompleted={isTodoCompleted}
              onChangeFilterType={setFilterType}
              filterType={filterType}
            />
          )}
      </div>

      <ErrorMessage
        error={error}
        onCloseError={setError}
      />
    </div>
  );
};
