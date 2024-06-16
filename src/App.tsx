/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { Footer, TodoStatus } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/Todo';
import { Errors } from './components/Errors/Errors';

const getVisibleTodos = (todos: Todo[], status: TodoStatus) => {
  let visibleTodos = [...todos];

  if (status !== 'All') {
    visibleTodos = visibleTodos.filter(todo => {
      return status === 'Active' ? !todo.completed : todo.completed;
    });
  }

  return visibleTodos;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [status, setStatus] = useState<TodoStatus>('All');
  const [error, setError] = useState('');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  const visibleTodos = getVisibleTodos(todos, status);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <TodoList visibleTodos={visibleTodos} />

        {todos.length > 0 && (
          <Footer todos={todos} status={status} setStatus={setStatus} />
        )}
      </div>

      <Errors error={error} setError={setError} />
    </div>
  );
};
