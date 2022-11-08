import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  handleDeleteButton: (event: React.FormEvent, todoId: number) => void;
};

export const TodoList: React.FC<Props>
= React.memo(({ todos, handleDeleteButton }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoInfo
        todo={todo}
        handleDeleteButton={handleDeleteButton}
        key={todo.id}
      />
    ))}
  </section>
));
