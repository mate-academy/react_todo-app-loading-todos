import React from 'react';
import { TodoItem } from './TodoItem';
import { Todo } from '../types/Todo';
import classNames from 'classnames';

type Props = {
  todos: Todo[];
  isLoading: boolean;
};

export const TodoList: React.FC<Props> = ({ todos, isLoading }) => {
  return (
    <section
      className={classNames('todoapp__main', {
        hidden: todos?.length === 0,
      })}
      data-cy="TodoList"
    >
      {!isLoading && todos?.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </section>
  );
};
