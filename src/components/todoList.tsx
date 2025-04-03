import { TodoItem } from './todoItem';
import { Todo } from '../types/Todo';
import React from 'react';

type Props = {
  filteredTodo: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodo }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodo.map(todo => {
        return <TodoItem key={todo.id} todos={todo} />;
      })}
    </section>
  );
};
