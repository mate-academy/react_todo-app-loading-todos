import React from 'react';
// import classNames from 'classnames';

import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
type Props = {
  visibleTodos: Todo[];
};
export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}
      {visibleTodos.map(todoItem => (
        <TodoItem todo={todoItem} key={todoItem.id} />
      ))}
    </section>
  );
};
