/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { getTodos } from './api/todos';
import { AuthContext } from './components/Auth/AuthContext';
import { ErrorNotification } from './components/Errors/ErrorNotification';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';
import { FilterTypes } from './types/FilterType';
import { Todo } from './types/Todo';
import { User } from './types/User';

export function getFilterTodos(
  todos: Todo[],
  filterTypes: FilterTypes,
) {
  const filterTodo = [...todos];

  switch (filterTypes) {
    case FilterTypes.Active:
      return filterTodo.filter(({ completed }) => !completed);

    case FilterTypes.Completed:
      return filterTodo.filter(({ completed }) => completed);

    default:
      return filterTodo;
  }
}

export const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const user = useContext<User | null>(AuthContext);
  const userId = user?.id || 0;
  const newTodoField = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState<FilterTypes>(FilterTypes.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const todoFromServer = async () => {
      try {
        const todosFromServer = await getTodos(userId);

        setTodos(todosFromServer);
      } catch (error) {
        setErrorMessage(`${error}`);
      } finally {
        setIsLoading(true);
      }
    };

    todoFromServer();
  }, []);

  const filteredTodos = useMemo(() => (
    getFilterTodos(todos, filterBy)
  ), [todos, filterBy]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <>
          <Header newTodoField={newTodoField} />

          <TodoList todos={filteredTodos} isLoading={isLoading} />

          <Footer
            getFilterTodo={setFilterBy}
            filteredTodos={filteredTodos}
            selectedTab={filterBy}
          />
        </>
      </div>

      {errorMessage && (
        <ErrorNotification
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};
