import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { TodoFilter } from './components/TodoFilter';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { NotificationError } from './components/NotificationError';
import { FilterType } from './types/FilterTypes';

const USER_ID = 6996;

const getFilteredTodo = (
  todos: Todo[],
  sortType: FilterType,
): Todo[] => {
  let filteredTodo: Todo[] = [...todos];

  if (sortType === FilterType.ACTIVE) {
    filteredTodo = todos.filter(todo => !todo.completed);
  }

  if (sortType === FilterType.COMPLETED) {
    filteredTodo = todos.filter(todo => todo.completed);
  }

  return filteredTodo;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedType, setSelectedType] = useState(FilterType.ALL);
  const [query, setQuery] = useState('');
  const [showError, setShowError] = useState('');

  useEffect(() => {
    getTodos(USER_ID)
      .then(setTodos);
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const visibleTodos = getFilteredTodo(todos, selectedType);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <TodoInput
            query={query}
            onQuery={setQuery}
          />
        </header>

        {todos && (
          <section className="todoapp__main">
            <TodoList todos={visibleTodos} />
          </section>
        )}

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <TodoFilter
              todos={visibleTodos}
              selectedType={selectedType}
              onSelectedType={setSelectedType}
            />
          </footer>
        )}
      </div>

      {showError && (
        <NotificationError
          showError={showError}
          onShowError={setShowError}
        />
      )}
    </div>
  );
};
