/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getTodos } from './api/todos';

import { AuthContext } from './components/Auth/AuthContext';

import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessages } from './components/ErrorMessages';

import { FilterBy } from './types/FilterBy';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const user: User | null = useContext(AuthContext);
  const newTodoField = useRef<HTMLInputElement>(null);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [isSuccessful, setIsSuccessful] = useState(true);
  const [filterBy, setFilterBy] = useState<FilterBy>(FilterBy.All);

  const getTodosFromApi = async () => {
    try {
      if (user) {
        const todosFromApi = await getTodos(user.id);

        setTodos(todosFromApi);
        setVisibleTodos(todosFromApi);
      }
    } catch (error) {
      setIsSuccessful(false);

      setTimeout(() => {
        setIsSuccessful(true);
      }, 4000);
    }
  };

  const filterTodos = () => {
    const newVisibleTodos = todos.filter(({ completed }) => {
      switch (filterBy) {
        case FilterBy.Completed:
          return completed;

        case FilterBy.Active:
          return !completed;

        default:
          return true;
      }
    });

    setVisibleTodos(newVisibleTodos);
  };

  useEffect(() => {
    // focus the element with `ref={newTodoField}`
    if (newTodoField.current) {
      newTodoField.current.focus();
    }

    getTodosFromApi();
  }, []);

  useEffect(filterTodos, [filterBy, todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header newTodoField={newTodoField} />

        {todos.length > 0 && (
          <>
            <TodoList todos={visibleTodos} />

            <Footer
              todosLeft={todos.filter(({ completed }) => !completed).length}
              filterBy={filterBy}
              setFilterBy={setFilterBy}
            />
          </>
        )}
      </div>

      {!isSuccessful && <ErrorMessages />}
    </div>
  );
};
