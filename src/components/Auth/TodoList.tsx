import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoComponent } from './Todo';

interface Props {
  visibleTodos: Todo[]
}

export const TodoList: FC<Props> = ({ visibleTodos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {
      visibleTodos
        .map(({ title, completed, id }) => (
          <TodoComponent
            key={id}
            title={title}
            completed={completed}
          />
        ))
    }
  </section>
);
