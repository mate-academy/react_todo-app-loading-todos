import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';

interface TodoListProps {
  filteredTodos: Todo[];
}

const TodoList: React.FC<TodoListProps> = ({ filteredTodos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {filteredTodos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </section>
);

export default TodoList;
