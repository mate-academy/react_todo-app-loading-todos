import React, { useEffect, useMemo, useState } from 'react';

import { Todo } from '../types/Todo';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';

import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[],
};

export const Content: React.FC<Props> = ({ todos }) => {
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setVisibleTodos(todos.filter(todo => {
      switch (filter) {
        case (Filter.all):
          return !!todo;

        case (Filter.active):
          return !todo.completed;

        case (Filter.completed):
          return todo.completed;

        default:
          return false;
      }
    }));
  }, [visibleTodos, filter]);

  const isAllActive = useMemo(
    () => todos?.every(todo => todo.completed),
    [todos],
  );

  return (
    <div className="todoapp__content">
      <Header active={isAllActive} />

      <Main visibleTodos={visibleTodos} />

      {!todos?.length || (
        <Footer
          visibleTodos={visibleTodos}
          filter={filter}
          onChange={setFilter}
        />
      )}
    </div>
  );
};
