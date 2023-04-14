import React from 'react';
// import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[],
  handleChangeCompleted: (id: number) => void,
};

export const TodosList: React.FC<Props> = ({
  todos,
  handleChangeCompleted,
}) => {
  return (
    <>
      {todos.map((todo) => (
        <div
          className={`todo ${todo.completed === true && ('completed')}`}
          key={todo.id}
        >
          <TodoItem
            handleChangeCompleted={handleChangeCompleted}
            todo={todo}
          />
        </div>
      ))}
    </>
  );
};
