// import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
