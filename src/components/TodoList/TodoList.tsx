import React from 'react';
import { TodoItem } from '../Todo/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
