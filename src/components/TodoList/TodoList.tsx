import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  todos: Todo[],
  deleteTodo: (todoId: number) => void,
};

export const TodoList: React.FC<Props> = ({ todos, deleteTodo }) => (
  <section className="todoapp__main">
    {todos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
        deleteTodo={deleteTodo}
      />
    ))}
  </section>
);
