/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { getTodos } from './api/todos';
import { Todo } from './types/Todo';
import { ErrorMessage } from './components/ErrorMessage/Error';
import { FilterOptionType } from './types/FilterOptionType';
import { Footer } from './components/Footer/Footer';
import { TodoComponent } from './components/TodoComponent/TodoComponent';
import { Header } from './components/Header/Header';

export const App: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterOption, setFilterOption] = useState<FilterOptionType>('all');

  const filteredTodos = [...todos].filter(todo => {
    switch (filterOption) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .catch(() => {
        setErrorMessage('Unable to load todos');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header todos={todos} isLoading={isLoading} />

        <section className="todoapp__main" data-cy="TodoList">
          {!isLoading &&
            filteredTodos.map(todo => (
              <TodoComponent key={todo.id} todo={todo} isLoading={isLoading} />
            ))}
        </section>

        {todos.length > 0 && (
          <Footer
            todos={todos}
            filterOption={filterOption}
            setFilterOption={setFilterOption}
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
