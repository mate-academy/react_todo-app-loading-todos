/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ToDoList } from './components/ToDoList';
import { Error } from './types/Error';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const user = useContext(AuthContext);
  const [visibleToDos, setVisibleToDos] = useState<Todo[]>([]);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [activeCount, setActiveCount] = useState(0);
  const [filter, setFilter] = useState(Filter.All);
  const [errorType, setErrorType] = useState<Error | null>(null);

  const handleErrorClose = () => setErrorType(null);

  const getSelectedTodos = (todos: Todo[]) => {
    const filteredTodos = todos.filter(({ completed }) => {
      switch (filter) {
        case Filter.Active:
          return !completed;

        case Filter.Completed:
          return completed;

        default:
          return true;
      }
    });

    setVisibleToDos(filteredTodos);
  };

  useEffect(() => {
    setErrorType(null);

    if (user) {
      getTodos(user.id)
        .then(toDos => {
          getSelectedTodos(toDos);
          setHasCompleted(toDos.some(({ completed }) => completed));
          setActiveCount(toDos.filter(({ completed }) => !completed).length);
        })
        .catch(() => setErrorType(Error.Unexpected));
    }
  }, [filter]);

  useEffect(() => {
    setTimeout(() => {
      setErrorType(null);
    }, 3000);
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />

        <ToDoList todos={visibleToDos} />

        {(activeCount || hasCompleted) && (
          <Footer
            hasCompleted={hasCompleted}
            activeCount={activeCount}
            onFilterChange={setFilter}
            filter={filter}
          />
        )}
      </div>

      <ErrorMessage errorType={errorType} onErrorClose={handleErrorClose} />
    </div>
  );
};
