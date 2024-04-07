import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { useTodos } from '../Store/Store';

const TodoList: React.FC = () => {
  const { filteredTodos } = useTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};

export default TodoList;
