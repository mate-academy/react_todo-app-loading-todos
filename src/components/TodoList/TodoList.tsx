import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  filtredTodos: Todo[];
}

export const TodoList: React.FC<Props> = React.memo(({ filtredTodos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {filtredTodos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
  </section>
));
