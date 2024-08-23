import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../todoItem/TodoItem';

interface Props {
  todoList: Todo[];
}

export const TodoList: FC<Props> = ({ todoList }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todoList.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
