import React from 'react';
import { Todo as TodoType } from '../types/Todo';
import { Todo } from './Todo';
import { FilterType } from './Filter';

interface TodoListProps {
  todos: TodoType[];
  filter: FilterType;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, filter }) => {
  const getFilteredTodos = () => {
    switch (filter) {
      case FilterType.Active:
        return todos.filter(todo => !todo.completed);
      case FilterType.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
