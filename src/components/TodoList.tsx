import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

type TodoListProps = {
  todos: Todo[];
  tempTodo?: Todo | null;
};

export const TodoList: React.FC<TodoListProps> = React.memo(
  ({ todos, tempTodo }) => {
    return (
      <section className="todoapp__main" data-cy="TodoList">
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}

        {tempTodo && <TodoItem key="temp" todo={tempTodo} />}
      </section>
    );
  },
);

TodoList.displayName = 'TodoList';
