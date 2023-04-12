import { memo, FC } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from './components/TodoItem';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = memo(({ todos }) => (
  <>
    {todos.map((todo) => (
      <div key={todo.id}>
        <TodoItem
          todo={todo}
        />
      </div>
    ))}
  </>
));
