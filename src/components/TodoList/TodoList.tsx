import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  filteredTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ filteredTodos }) => {
  return (
    <>
      {filteredTodos.map(toDo => (
        <TodoItem todo={toDo} key={toDo.id} />
      ))}
    </>
  );
};
