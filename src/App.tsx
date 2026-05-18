/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, USER_ID } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorType } from './types/Errors';
import { ErrorNotification } from './components/ErrorNotification';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { TodoFooter } from './components/TodoFooter';

enum TodoStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const App: React.FC = () => {
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const [error, setError] = React.useState<ErrorType | null>(null);
  const [filterByStatus, setFilterByStatus] = React.useState<TodoStatus>(
    TodoStatus.All,
  );

  React.useEffect(() => {
    const loadTodos = async () => {
      try {
        setError(null);

        const data = await getTodos();

        setTodoList(data);
      } catch {
        setError('unableToLoad');
      }
    };

    void loadTodos();
  }, []);

  React.useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setError(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [error]);

  const filteredTodosList = React.useMemo(() => {
    switch (filterByStatus) {
      case TodoStatus.All:
        return todoList;

      case TodoStatus.Active:
        return todoList.filter(todo => !todo.completed);

      case TodoStatus.Completed:
        return todoList.filter(todo => todo.completed);

      default:
        return todoList;
    }
  }, [filterByStatus, todoList]);

  const isAllCompleted =
    todoList.length > 0 && todoList.every(todo => todo.completed);

  const activeTodosCount = React.useMemo(() => {
    return todoList.filter(todo => !todo.completed).length;
  }, [todoList]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header isAllCompleted={isAllCompleted} />

        <TodoList todos={filteredTodosList} />

        {/* Hide the footer if there are no todos */}
        {todoList.length > 0 && (
          <TodoFooter
            todosLeft={activeTodosCount}
            hasCompletedTodos={todoList.some(todo => todo.completed)}
            filterByStatus={filterByStatus}
            setFilterByStatus={setFilterByStatus}
          />
        )}
      </div>
      <ErrorNotification error={error} setError={setError} />
    </div>
  );
};
