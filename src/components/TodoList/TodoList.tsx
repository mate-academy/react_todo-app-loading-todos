import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter } = useAppContext();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <section className="todoapp__todo-list" data-cy="TodoList">
      {filteredTodos.map((todo, index) => (
        <TodoItem todo={todo} key={index} />
      ))}
    </section>
  );
};
