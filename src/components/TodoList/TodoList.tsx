import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  loading?: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, loading }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {loading && todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
};
