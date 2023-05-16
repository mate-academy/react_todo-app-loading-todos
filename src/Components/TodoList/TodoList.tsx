import { FC, memo } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem';
import { Category } from '../../utils/Category';

interface Props {
  todos: Todo[];
  category: Category;
}

export const TodoList: FC<Props> = memo(({ todos, category }) => {

  const filteredTodos = todos.filter(todo => {
    switch (category) {
      case Category.Active:
        return !todo.completed;
      case Category.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main">
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </section>
  );
});
