import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInput } from '../TodoInput/TodoInput';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos?.map(todo => <TodoInput todo={todo} key={todo.id} />)}
    </section>
  );
};
