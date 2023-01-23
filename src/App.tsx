/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AppFooter } from './components/AppFooter/AppFooter';
import { AppHeader } from './components/AppHeader/AppHeader';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { TodoList } from './components/TodoList/TodoList';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<Filter>('All');
  const [error, setError] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

  useEffect(() => {
    if (user) {
      try {
        getTodos(user.id)
          .then(setTodos);
      } catch {
        setError('Can\'t add todo');
      }
    }
  });

  const filteredTodos = todos.filter(todo => {
    switch (status) {
      case 'All':
        return todo;

      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        throw new Error('Invalid filter type');
    }
  });

  const amountOfActive = todos.filter(
    todo => !todo.completed,
  ).length;

  const amountofCompleted = filteredTodos.some(
    todo => todo.completed,
  );

  const allCompleted = todos.filter(
    todo => todo.completed,
  ).length === filteredTodos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AppHeader
          newTodoField={newTodoField}
          areAllCompleted={allCompleted}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
            />

            <AppFooter
              amountOfActive={amountOfActive}
              amountofCompleted={amountofCompleted}
              status={status}
              changeStatus={setStatus}
            />
          </>
        )}
      </div>

      <ErrorNotification
        error={error}
      />
    </div>
  );
};
