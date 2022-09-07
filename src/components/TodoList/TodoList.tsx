import { useContext } from 'react';

import { StateContext } from '../../providers/StateContext';

import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { todos } = useContext(StateContext);

  // eslint-disable-next-line no-console
  console.log('TodoList re-render');

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </section>
  );
};
