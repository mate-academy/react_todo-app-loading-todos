import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../todoItem';
import { v4 as uuidv4 } from 'uuid';
type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}

      {todos.map(todo => (
        <TodoItem todo={todo} key={uuidv4()} />
      ))}
    </section>
  );
};
