import React from 'react';
import cn from 'classnames';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList:React.FC<Props> = ({ todos }) => (
  <section
    className={cn('todoapp__main', {
      hidden: todos.length === 0,
    })}
  >
    {todos.length > 0 && todos.map(todo => (
      <TodoItem todo={todo} />
    ))}
  </section>
);
