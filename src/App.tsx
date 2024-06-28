/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Error } from './components/Error/Error';
import { Todo } from './types/Todo';
import { FilterStatus } from './types/FilterStatus';

const getFilteredTodos = (todos: Todo[], status: FilterStatus): Todo[] => {
  const visibleTodos = [...todos];

  switch (status) {
    case FilterStatus.active:
      return visibleTodos.filter(todo => !todo.completed);
    case FilterStatus.completed:
      return visibleTodos.filter(todo => todo.completed);
    default:
      return visibleTodos;
  }
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.all);
  const [error, setError] = useState('');

  const filteredTodos = getFilteredTodos(todos, filterStatus);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
        setTimeout(() => setError(''), 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        <TodoList todos={filteredTodos} />
        {/* Hide the footer if there are no todos */}
        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterStatus={filterStatus}
            onChangeStatus={setFilterStatus}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      <Error error={error} setError={setError} />
    </div>
  );
};
