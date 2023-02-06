import React, { useState } from 'react';

import { Todo } from '../types/Todo';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { Filter } from '../types/Filter';

type Props = {
  todos: Todo[] | null,
};

export const Content: React.FC<Props> = ({ todos }) => {
  const [filter, setFilter] = useState<Filter>(Filter.all);

  const isAllActive = todos?.every(todo => !todo.completed);

  return (
    <div className="todoapp__content">
      <Header active={isAllActive} />

      <Main visibleTodos={todos} />

      {!todos?.length || (
        <Footer
          visibleTodos={todos}
          filter={filter}
          onChange={setFilter}
        />
      )}
    </div>
  );
};
