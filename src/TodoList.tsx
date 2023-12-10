import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from './types/Todo';

type Props = {
  filteredTodos: () => Todo[];
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  todos,
  setTodos,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos().map((todo: Todo) => (
        <TodoItem todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
      ))}
    </section>
  );
};
