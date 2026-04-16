import React from 'react';

import { Todo as TypeTodo } from '../types/Todo';
import { Todo } from './Todo';

type Props = {
  todos: TypeTodo[];
};

const TodosListComponent: React.FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

export const TodosList = React.memo(TodosListComponent);
