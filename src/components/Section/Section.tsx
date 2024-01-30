import React, { useContext } from 'react';
import { TodosContext } from '../Store/Store';
import { TodoItem } from '../TodoItem/TodoItem';
import { getFilteredTodos } from '../../services/getFilteredTodos';

type Props = {};

export const Section: React.FC<Props> = React.memo(() => {
  const { todos, filter } = useContext(TodosContext);

  const filteredTodos = getFilteredTodos(todos, filter);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
});
