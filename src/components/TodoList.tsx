import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  checkedTodoComleted: (id: number, completed: boolean) => void;
  removeTodo: (id: number) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  checkedTodoComleted,
  removeTodo,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          checkedTodoComleted={checkedTodoComleted}
          removeTodo={removeTodo}
        />
      ))}
    </section>
  );
};
