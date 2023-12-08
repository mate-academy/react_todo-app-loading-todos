/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';
import { FilterType } from './types/FilterType';

const USER_ID = 12004;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null);
  const [query, setQuery] = useState<FilterType>(FilterType.All);
  const [errorText, setErrorText] = useState<string>('');

  const getTodosList = async () => {
    try {
      const tmp = await getTodos(USER_ID);

      setTodos(tmp);
      setFilteredTodos(tmp);
    } catch (error) {
      setErrorText('Unable to load todos');
    }
  };

  useEffect(() => {
    getTodosList();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorText('');
    }, 3000);
  }, [errorText]);

  useEffect(() => {
    if (todos) {
      switch (query) {
        case FilterType.Active:
          setFilteredTodos(todos.filter((el) => !el.completed));
          break;
        case FilterType.Completed:
          setFilteredTodos(todos.filter((el) => el.completed));
          break;
        default:
          setFilteredTodos(todos);
          break;
      }
    }
  }, [query, todos]);

  const leftItems = (): number => {
    if (todos) {
      const tmp = todos.filter((el) => !el.completed);

      return tmp.length;
    }

    return 0;
  };

  return (

    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <Header />
        {filteredTodos && (<TodoList todos={filteredTodos} />)}
        {todos && todos?.length > 0 && (
          <Footer
            setQuery={setQuery}
            leftItems={leftItems}
            query={query}
          />
        )}

        <ErrorMessage errorText={errorText} setErrorText={setErrorText} />

      </div>
    </div>
  );
};
