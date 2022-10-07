/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect, useMemo, useRef,
  useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification }
  from './components/ErrorNotification/ErrorNotification';
import { Footer } from './components/FilterTodos/FilterTodos';
import { Header } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';
import { GroupBy } from './types/GroupBy';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [error, setError] = useState(false);

  if (error) {
    setTimeout(() => {
      setError(false);
    }, 3000);
  }

  const loadTodos = async () => {
    try {
      setTodos(await getTodos(user?.id || 0));
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    loadTodos();
  }, []);

  const filterTodos = (groupBy: string) => {
    setVisibleTodos(
      todos.filter(todo => {
        switch (groupBy) {
          case GroupBy.Active:
            return !todo.completed;
          case GroupBy.Completed:
            return todo.completed;

          default:
            return true;
        }
      }),
    );
  };

  const completedTodos = useMemo(() => (
    todos.filter(({ completed }) => completed)
  ), [todos]);

  const leftTodos = useMemo(() => (
    todos.filter(({ completed }) => !completed)
  ), [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          newTodoField={newTodoField}
          todos={todos}
          leftTodosLength={leftTodos.length}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />
            <Footer
              filterTodos={filterTodos}
              completedTodosLength={completedTodos.length}
              leftTodosLength={leftTodos.length}
            />
          </>
        )}
      </div>

      <ErrorNotification error={error} />
    </div>
  );
};
