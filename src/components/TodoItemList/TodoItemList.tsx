import { FC } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { Todo } from '../../types/Todo';

interface TodoItemListProps {
  todos: Todo[];
}

export const TodoItemList: FC<TodoItemListProps> = ({ todos }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map((todo: Todo) => {
        return (
          <TodoItem
            title={todo.title}
            userId={todo.userId}
            key={todo.id}
            id={todo.id}
            completed={todo.completed}
          />
        );
      })}
    </section>
  );
};
