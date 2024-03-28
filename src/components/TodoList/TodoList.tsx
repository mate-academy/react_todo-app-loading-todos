import React from 'react';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';
import { useTodos } from '../../TodosContext';
import { FilterStatus } from '../../types/FilterStatus';

export const TodoList: React.FC = () => {
  const { todos, setTodos, filterStatus } = useTodos();

  const filteredTodos = todos.filter(todo => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  const handleToggleTodo = (id: number) => {
    setTodos((prevTodos: Todo[]) => {
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
};
