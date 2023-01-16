import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  filtredTodos: Todo[],
};

export const TodoList: React.FC<Props> = ({
  filtredTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filtredTodos.map(todoItem => (
        <TodoInfo
          todoList={todoItem}
          key={todoItem.id}
        />
      ))}
    </section>
  );
};
