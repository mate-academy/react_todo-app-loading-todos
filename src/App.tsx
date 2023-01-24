/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getFilteredTodos } from './api/helper';
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
  const [statusFilter, setStatusFilter] = useState<Filter>('All');
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
        setError('Can\'t load todo');
      }
    }
  });

  const filteredTodos = useMemo(() => (
    getFilteredTodos(todos, statusFilter)
  ), [todos, statusFilter]);

  const amountOfActive = useMemo(() => (
    todos.filter(
      todo => !todo.completed,
    ).length
  ), [todos]);

  const completedTodosLength = useMemo(() => (
    todos.filter(
      todo => todo.completed,
    ).length
  ), [todos]);

  const isAllCompleted = completedTodosLength === todos.length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AppHeader
          newTodoField={newTodoField}
          isAllCompleted={isAllCompleted}
        />

        {todos.length > 0 && (
          <>
            <TodoList
              todos={filteredTodos}
            />

            <AppFooter
              amountOfActive={amountOfActive}
              completedTodosLength={completedTodosLength}
              statusFilter={statusFilter}
              onChangeStatusFilter={setStatusFilter}
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
