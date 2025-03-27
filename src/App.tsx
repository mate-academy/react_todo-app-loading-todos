/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID } from './api/todos';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Error } from './components/Error/Error';
import { ErrorEnum } from './types/ErrorEnum';

export const App: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<ErrorEnum | null>(ErrorEnum.LOAD);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => setError(ErrorEnum.LOAD));
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
      case 'all':
        return true;
    }
  });

  const activeTodos = todos.filter(todo => !todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header query={query} onInput={setQuery} />

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <Footer
            filter={filter}
            onFilter={setFilter}
            left={activeTodos.length}
          />
        )}
      </div>

      <Error error={error} onClose={() => setError(null)} />
    </div>
  );
};
