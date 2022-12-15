import { memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = memo(({ todos }) => {
  return (
    <>
      {todos.map((todo) => (
        <section
          className="todoapp__main"
          data-cy="TodoList"
          key={todo.id}
        >
          <TodoInfo todo={todo} />
        </section>
      ))}
    </>
  );
});
