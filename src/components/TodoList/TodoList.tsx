import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return todos.map(({ id, title, completed }) => {
    return <TodoItem key={id} id={id} title={title} completed={completed} />;
  });
};
