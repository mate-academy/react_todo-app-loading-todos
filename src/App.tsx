import React, {
  useContext, useEffect, useMemo, useState,
} from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { TodoList } from './components/TodoList';
import { TodosFooter } from './components/TodosFooter';
import { ErrorBlock } from './components/ErrorBlock';
import { FilterState } from './types/FilterState';
import { TodosHeader } from './components/TodosHeader';
import { CustomError } from './types/CustomError';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const initialError = { active: false, messages: [] };
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState<CustomError>(initialError);
  const [filterState, setFilterState] = useState<FilterState>(FilterState.All);

  const toggleError = (active: false) => {
    setError((prevState) => ({
      ...prevState,
      active,
    }));
  };

  const handleError = (message = '') => {
    if (!message.length) {
      toggleError(false);
    } else {
      setError({ active: true, messages: [message] });
      setTimeout(() => {
        toggleError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    async function fetchTodos() {
      if (!user) {
        return;
      }

      try {
        const fetchedTodos = await getTodos(user.id);

        setTodos(fetchedTodos);
      } catch {
        handleError("Couldn't load todos.");
      }
    }

    fetchTodos();
  }, []);

  const todoFilterStatePredicate = (todo: Todo) => {
    switch (filterState) {
      case FilterState.Active:
        return !todo.completed;
      case FilterState.Completed:
        return todo.completed;
      default:
        return true;
    }
  };

  const renderedTodos
    = useMemo(
      () => todos.filter(todoFilterStatePredicate), [todos, filterState],
    );
  const activeTodosAmount
    = useMemo(() => todos.filter(todo => !todo.completed).length, [todos]);

  const completedTodosAmount
    = useMemo(() => todos.filter(todo => todo.completed).length, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <TodosHeader
          todos={todos}
          activeTodosAmount={activeTodosAmount}
        />

        {todos.length > 0 && (
          <>
            <TodoList todos={renderedTodos} />

            <TodosFooter
              activeNumber={activeTodosAmount}
              completedNumber={completedTodosAmount}
              selectedFilter={filterState}
              onFilterSelect={setFilterState}
            />
          </>
        )}
      </div>
      <ErrorBlock
        error={error}
        onErrorClose={handleError}
      />
    </div>
  );
};
