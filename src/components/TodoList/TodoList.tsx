import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todoList: Todo[],
  setShowError: (str: string) => void
};

export const TodoList: React.FC<Props> = ({ todoList, setShowError }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setShowError={setShowError}
        />
      ))}
    </section>
  );
};
