import React from 'react';
import { TodoItem } from '../TodoItem';
import { useTodos } from '../TodosProvider';

export const TodoList: React.FC = React.memo(function TodoList() {
  const { filteredTodos, setTodos } = useTodos();

  const handleToggleTodo = (id: number) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      );

      return updatedTodos;
    });
  };

  return (
    <>
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => handleToggleTodo(todo.id)}
        />
      ))}
    </>
  );
});
