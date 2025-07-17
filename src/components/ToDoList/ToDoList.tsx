import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../ToDoItem/ToDoItem';

type Props = {
  todos: Todo[];
  loading: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, loading }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {loading && (
      <div data-cy="TodoLoader" className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    )}
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </section>
);
