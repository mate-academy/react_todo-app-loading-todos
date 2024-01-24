import { useContext, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { TodoItem } from '../TodoItem';

import { Context } from '../../Context';

export const Main = () => {
  const { todos } = useContext(Context);

  const location = useLocation().pathname.slice(1);

  const filteredTodos = useMemo(() => {
    if (location === 'active') {
      return todos.filter((item) => !item.completed);
    }

    if (location === 'completed') {
      return todos.filter((item) => item.completed);
    }

    return todos;
  }, [location, todos]);

  return (
    <section className="todoapp__main" data-cy="TodoList">

      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
