import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todoList: Todo[];
  deleteTodos: (todoId: number) => Promise<unknown>;
  completed: (todoId: number) => Promise<Todo> | undefined;
};

export const TodoList: React.FC<Props> = ({
  todoList,
  deleteTodos,
  completed,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          deleteTodos={() => deleteTodos(todo.id)}
          cheketCompleted={() => completed(todo.id)}
        />
      ))}
    </section>
  );
};
