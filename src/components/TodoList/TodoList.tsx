import React, { useContext } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList: React.FC = () => {
  const { visibleTodos } = useContext(TodoContext);

  return (
    <section className="todoapp__main">
      {visibleTodos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
