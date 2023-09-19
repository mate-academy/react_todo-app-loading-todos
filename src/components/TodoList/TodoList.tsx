import React from 'react';

import { TodoItem } from '../TodoItem';
import { TodoLoadingItem } from '../TodoLoadingItem';

import { UseTodosContext } from '../../utils/TodosContext';

type Props = {
};

export const TodoList: React.FC<Props> = () => {
  const context = UseTodosContext();

  const {
    filteredTodos,
    titleOfLoadingTodo,
  } = context;

  return (
    <section className="todoapp__main">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}

      {titleOfLoadingTodo && (
        <TodoLoadingItem title={titleOfLoadingTodo} />
      )}
    </section>
  );
};
