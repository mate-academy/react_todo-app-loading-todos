import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { SingleTodo } from './SingleTodo';

type Props = {
  filteredTodos: Todo[] | undefined,
};

export const TodoList: FC<Props> = ({ filteredTodos }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {/* DISPLAYING TODOS */}
    {
      filteredTodos?.map(todo => (
        <div
          key={todo.id}
          data-cy="Todo"
          className={cn('todo', {
            completed: todo.completed,
          })}
        >
          <SingleTodo todo={todo} />
        </div>
      ))
    }
  </section>
);
