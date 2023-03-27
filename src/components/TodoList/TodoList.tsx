import { FC } from 'react';
import { Todo } from '../TodoItem/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

interface Props {
  todos: Todo[]
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="todoapp__main">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
