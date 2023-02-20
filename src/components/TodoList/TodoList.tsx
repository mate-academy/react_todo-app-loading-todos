import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
  addCompletedTodos: (todoId: number) => void
};

export const TodoList: React.FC<Props> = ({ todos, addCompletedTodos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoInfo
          key={todo.id}
          todo={todo}
          addCompletedTodos={addCompletedTodos}
        />
      ))}
    </section>
  );
};
