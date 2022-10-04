/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useEffect, useRef, useState, useContext,
} from 'react';
import { AuthContext } from './components/Auth/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ErrorNotification } from './components/ErrorNotification';
import { FilterTypes } from './types/FilterType';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';
import { getTodos } from './api/todos';

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
  const userId = user?.id ? user.id : 0;
  const newTodoField = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [filterBy, setFilterBy] = useState<FilterTypes>(FilterTypes.All);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  }, []);

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

  const filteredTodos = getFilterTodos(todos, filterBy);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos && (
          <>
            <TodoList todos={filteredTodos} isLoading={isLoading} />

            <Footer
              getFilterTodo={setFilterBy}
              filteredTodos={filteredTodos}
              selectedTab={filterBy}
            />
          </>

        )}

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
