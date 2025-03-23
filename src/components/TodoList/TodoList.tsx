import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { FilterType } from '../../types/FilterType';

import { TodoItem } from '../Todo/TodoItem';
import { Footer } from '../Footer/Footer';

type Props = {
  todoList: Todo[];
  showErrorMessage: (message: string, delay?: number) => void;
};

export const TodoList: React.FC<Props> = ({ todoList, showErrorMessage }) => {
  const [activeFilter, setActiveFilter] = useState<FilterType>(FilterType.all);

  const filteredList = (list: Todo[]) => {
    switch (activeFilter) {
      case FilterType.all: {
        return list;
      }

      case FilterType.active: {
        return list.filter(item => !item.completed);
      }

      case FilterType.completed: {
        return list.filter(item => item.completed);
      }
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredList(todoList).map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          showErrorMessage={showErrorMessage}
        />
      ))}

      {todoList?.length !== 0 && (
        <Footer
          todoList={todoList}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
      )}
    </section>
  );
};
