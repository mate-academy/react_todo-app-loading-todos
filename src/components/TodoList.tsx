import React, { useContext } from 'react';
import { TodoContext } from '../TodoProvider';
import { TodoTask } from './TodoTask';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoTask key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
