/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import { Filter } from './components/Filter';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { ErrorMessage } from './components/ErrorMessage';
import { Todo } from './types/Todo';
import { getTodos } from './api/todos';

export type FilterType = 'all' | 'active' | 'completed';

const USER_ID = 12004;

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null);
  const [query, setQuery] = useState<FilterType>('all');
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

  const filtering = (qu: FilterType) => {
    setQuery(qu);
    if (todos) {
      if (qu === 'active') {
        setFilteredTodos(todos.filter((el) => !el.completed));
      } else if (qu === 'completed') {
        setFilteredTodos(todos.filter((el) => el.completed));
      } else {
        setFilteredTodos(todos);
      }
    }
  };

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
        <Filter />
        {filteredTodos && (<TodoList todos={filteredTodos} />)}
        {todos && todos?.length > 0 && (
          <Footer
            filtering={filtering}
            leftItems={leftItems}
            query={query}
          />
        )}

        <ErrorMessage errorText={errorText} setErrorText={setErrorText} />

      </div>
    </div>
  );
};
