/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AddTodo } from './components/Auth/AddTodo/AddTodo';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorWindow } from './components/Auth/ErrorWindow/ErrorWindow';
// eslint-disable-next-line
import { FilterComponent } from './components/Auth/FilterComponent/FilterComponent';
import { TodoList } from './components/Auth/TodoList/TodoList';
import { TodoContext } from './context/TodoContext';

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext(AuthContext);
  const {
    setFiltredTodos,
    filterState,
    handleFilter,
    todos,
    setTodos,
  } = useContext(TodoContext);

  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        if (user) {
          const todoData = await getTodos(user.id);

          setTodos(todoData);
          setFiltredTodos(todoData);
        }
      } catch (_) {
        setLoadError(true);
        setTimeout(() => setLoadError(false), 3000);
      }
    };

    loadTodos();
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <AddTodo />

        <TodoList />

        {todos.length > 0 && (
          <FilterComponent
            todos={todos}
            filterState={filterState}
            handleFilter={handleFilter}
          />
        )}
      </div>

      <ErrorWindow loadError={loadError} setLoadError={setLoadError} />

    </div>
  );
};
