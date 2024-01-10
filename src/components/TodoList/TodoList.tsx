import React from 'react';
import { useTodos } from '../Context';
import { TodoItem } from '../TodoItem';

type MagicWords = 'active' | 'completed';

const ACTIVE_TODOS: MagicWords = 'active';
const COMPLETED_TODOS: MagicWords = 'completed';

export const TodoList: React.FC = () => {
  const { todos, filter } = useTodos();

  const filteredTodos = () => {
    switch (filter) {
      case ACTIVE_TODOS:
        return todos.filter(todo => !todo.completed);

      case COMPLETED_TODOS:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos().map((todo) => {
        return (
          <TodoItem {...todo} />
        );
      })}
    </section>
  );
};
