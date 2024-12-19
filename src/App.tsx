import React, { useEffect, useState, useMemo } from 'react';
import { UserWarning } from './UserWarning';
import { Header } from './components/Header';
import { Todo } from './types/Todo';
import { getTodos, USER_ID } from './api/todos';
import { TodoItem } from './components/TodoItem';
import { Errors } from './components/Errors';
import { Footer } from './components/Footer';
import { filterTodos } from './utils/FilterTodo';
import { FilterBy } from './types/FilterBy';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState('');
  const [currentFilter, setCurrentFilter] = useState<FilterBy>(FilterBy.All);

  useEffect(() => {
    setError('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setError('Unable to load todos');
      });
  }, []);

  const filtered = useMemo(
    () => filterTodos(todos, currentFilter),
    [todos, currentFilter],
  );

  const handleNewTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const toggleTodoStatus = (updatedTodo: Todo) => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodo : todo)),
    );
  };

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header onTodo={handleNewTodo} onError={setError} />

        <section className="todoapp__main" data-cy="TodoList">
          {filtered.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggleStatus={toggleTodoStatus}
            />
          ))}
        </section>

        {todos.length !== 0 && (
          <Footer
            currentFilter={currentFilter}
            setCurrentFilter={setCurrentFilter}
            todos={todos}
            setTodos={setTodos}
          />
        )}
      </div>

      <Errors error={error} onClearError={setError} />
    </div>
  );
};
