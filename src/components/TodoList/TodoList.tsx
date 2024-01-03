import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <ul className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </ul>
  );
});
