/* eslint-disable jsx-a11y/label-has-associated-control */

import { useContext } from 'react';
import { StateContext } from '../../store/Store';
import { TodoItem } from '../TodoItem/TodoItem';
import { handleFilteredTodos } from '../../utils/helpers';

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoList = () => {
  const { todos, sortBy } = useContext(StateContext);

  const filteredTodos = handleFilteredTodos(todos, sortBy);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => {
        return <TodoItem key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
