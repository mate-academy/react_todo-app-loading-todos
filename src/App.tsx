import React, { useState, useEffect } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, getTodos } from './api/todos';
import Notifications from './components/Notifications';
import { Todo } from './types/Todo';
import { Filter } from './components/Filter';
import { TodoList } from './components/TodoList';
import { FilterStatus } from './types/filterStatus';

const allFilters = {
  [FilterStatus.All]: () => true,
  [FilterStatus.Active]: (td: Todo) => !td.completed,
  [FilterStatus.Completed]: (td: Todo) => td.completed,
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentFilter, setCurrentFilter] = useState<FilterStatus>(
    FilterStatus.All,
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setErrorMessage('');

    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => setErrorMessage(''), 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const filteredTodos = todos.filter(allFilters[currentFilter]);
  const incompletedTodos = todos.filter(td => !td.completed);

  const handleCloseError = () => setErrorMessage('');

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          <input
            type="text"
            data-cy="NewTodoField"
            className="todoapp__new-todo"
            placeholder="What needs to be done?"
          />
        </header>

        <TodoList todos={filteredTodos} />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {incompletedTodos.length} items left
            </span>

            <Filter
              currentFilter={currentFilter}
              onFilterChange={setCurrentFilter}
            />
          </footer>
        )}
      </div>

      <Notifications message={errorMessage} onClose={handleCloseError} />
    </div>
  );
};
