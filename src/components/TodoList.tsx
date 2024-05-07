import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './Todo';

interface TodoListProps {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  onDeleteTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, filter, onDeleteTodo }) => {
  const filteredTodos =
    filter === 'all'
      ? todos
      : filter === 'active'
        ? todos.filter(todo => !todo.completed)
        : todos.filter(todo => todo.completed);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onDeleteTodo={onDeleteTodo} />
      ))}
    </section>
  );
};

export default TodoList;
