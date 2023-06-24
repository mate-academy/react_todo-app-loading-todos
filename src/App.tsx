/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserWarning } from './UserWarning';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';

const USER_ID = 10824;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [errorType, setErrorType] = useState('');
  const [filterType, setFilterType] = useState(FilterType.ALL);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newTodos = await getTodos(USER_ID);

        setTodos(newTodos);
      } catch (error) {
        setErrorType('Unable to load todos');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (errorType !== '') {
      setTimeout(() => {
        setErrorType('');
      }, 3000);
    }
  }, [errorType]);

  const onChangeQuery = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const getVisibleTodo = (filter: FilterType, todosArr: Todo[]) => {
    switch (filter) {
      case FilterType.ACTIVE:
        return todosArr.filter(todo => !todo.completed);
      case FilterType.COMPLETED:
        return todosArr.filter(todo => todo.completed);
      default:
        return todosArr;
    }
  };

  const deleteErrorMessage = () => {
    setErrorType('');
  };

  const visibleTodos = getVisibleTodo(filterType, todos);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header
          query={query}
          onChangeQuery={onChangeQuery}
        />

        <TodoList
          todos={visibleTodos}
        />

        {!!todos.length && (
          <Footer
            itemsLeft={itemsLeft}
            filterType={filterType}
            setFilterType={setFilterType}
          />
        )}
      </div>

      {!!errorType.length && (
        <div className={classNames(
          'notification',
          'is-danger',
          'is-light',
          'has-text-weight-normal', {
            hidden: errorType.length === 0,
          },
        )}
        >
          <button
            type="button"
            className="delete"
            onClick={deleteErrorMessage}
          />
          {errorType}
        </div>
      )}
    </div>
  );
};
