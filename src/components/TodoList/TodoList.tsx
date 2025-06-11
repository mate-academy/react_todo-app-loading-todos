import React from 'react';

import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';
import { TodoItem } from '../TodoItem';

type Props = {
  todos: Todo[];
  filterField: Filter;
};

const getFilteredTodos = (todos: Todo[], filterField: Filter) => {
  let filteredTodos = [...todos];

  if (filterField === Filter.Active) {
    filteredTodos = filteredTodos.filter(todo => !todo.completed);
  }

  if (filterField === Filter.Completed) {
    filteredTodos = filteredTodos.filter(todo => todo.completed);
  }

  return filteredTodos;
};

export const TodoList: React.FC<Props> = ({ todos, filterField }) => {
  const filteredTodos = getFilteredTodos(todos, filterField);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem todo={todo} key={todo.id} />;
      })}
    </section>
  );
};
