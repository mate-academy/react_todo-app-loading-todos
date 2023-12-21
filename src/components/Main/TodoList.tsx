import React, { useContext } from 'react';
import { TodosContext } from '../../contexts/TodosContext';
import TodoItem from '../../TodoItem';

export const TodoList: React.FC = () => {
  const { preparedTodos: todos } = useContext(TodosContext);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
};
