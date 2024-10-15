import React from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

interface Props {
  displayedTodos: Todo[];
}

export const TodoList: React.FC<Props> = ({ displayedTodos }) => {
  return displayedTodos.map(({ id, title, completed }) => {
    return <TodoItem key={id} id={id} title={title} completed={completed} />;
  });
};
