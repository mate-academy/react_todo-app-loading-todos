import React from 'react';
import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

type TodoListProps = {
  todos: Todo[];
};

const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </section>
);

export default TodoList;
