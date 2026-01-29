import React from 'react';
import { Todo } from '../../types/Todo';
import TodoItem from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[];
  handleTodoToggle: (todoId: number) => void;
}

const Todos = ({ todos, handleTodoToggle }: Props) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={handleTodoToggle} />
      ))}
    </section>
  );
};

export default React.memo(Todos);
