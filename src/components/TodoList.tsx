import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

type Props = {
  visibleTodos: Todo[];
};

const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {visibleTodos &&
        visibleTodos.map((todo: Todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
    </section>
  );
};

export default TodoList;
