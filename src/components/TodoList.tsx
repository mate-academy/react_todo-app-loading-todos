import React from 'react';
import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from './TodoContext';
import { FilterAction } from '../types/Actions';

export const TodoList: React.FC = () => {
  const { todos, filter, dispatch } = useContext(TodoContext);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case FilterAction.Active:
        return !todo.completed;
      case FilterAction.Completed:
        return todo.completed;
      case FilterAction.All:
      default:
        return todos;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} dispatch={dispatch} />
      ))}
    </section>
  );
};
