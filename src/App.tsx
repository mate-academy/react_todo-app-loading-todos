/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { UserWarning } from './UserWarning';
import { USER_ID, addTodo, getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { FilterBy } from './utils/FilterBy';
import { ErrorMessage } from './components/Error';
import { ErrorTypes } from './types/ErrorTypes';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [errorMessage, setErrorMessage] = useState<ErrorTypes | null>(null);

  useEffect(() => {
    getTodos()
      .then(data => {
        setTodos(data);
        setFilteredTodos(data);
      })
      .catch(() => {
        setErrorMessage(ErrorTypes.UnableToLoad);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const applyFilter = (filt: string, todosArr: Todo[]) => {
    setFilteredTodos(FilterBy(filt, todosArr));
  };

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
    applyFilter(newFilter, todos);
  };

  const handleToggleTodo = (id: number) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
    applyFilter(filter, updatedTodos);
  };

  const handleAddTodo = ({
    title,
    userId,
    completed,
  }: Omit<Todo, 'id'>): Promise<void> => {
    setErrorMessage(null);

    if (!title) {
      setErrorMessage(ErrorTypes.invalidTitle);

      return Promise.resolve();
    }

    return addTodo({ title, userId, completed })
      .then(newTodo => {
        const updatedTodos = [...todos, newTodo];

        setTodos(updatedTodos);
        applyFilter(filter, updatedTodos);
      })
      .catch(error => {
        setErrorMessage(ErrorTypes.UnableToAdd);
        throw error;
      });
  };

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header handleAddTodo={handleAddTodo} todos={todos} />

        <TodoList todos={filteredTodos} handleToggleTodo={handleToggleTodo} />

        {!!todos.length && (
          <Footer
            filter={filter}
            handleFilterChange={handleFilterChange}
            todos={todos}
          />
        )}
      </div>
      <ErrorMessage
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};
