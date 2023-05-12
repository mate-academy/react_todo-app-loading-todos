import React from 'react';
import uuid from 'react-uuid';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

type Props = {
  visibleTodos: Todo[];
};

export const TodoList: React.FC<Props> = ({ visibleTodos }) => {
  return (

    <section className="todoapp__main">

      {visibleTodos.map(todo => {
        const { title } = todo;

        return <TodoItem title={title} key={uuid()} />;
      })}
    </section>
  );
};
