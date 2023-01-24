import { FC, memo } from 'react';
import { Todo } from '../types/Todo';
import { TodoComponent } from './Todo';

interface Props {
  todos: Todo[]
}

export const TodoList: FC<Props> = memo(
  ({ todos }) => (
    <section className="todoapp__main" data-cy="TodoList">
      {
        todos
          .map((todo) => (
            <TodoComponent
              key={todo.id}
              todo={todo}
            />
          ))
      }
    </section>
  ),
);
