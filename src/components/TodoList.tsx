import { Todo } from '../types/Todo';
import { TodoItems } from './TodoItems';

type Props = {
  posts: Todo[];
};

export const TodoList: React.FC<Props> = ({ posts }) => (
  <section className="todoapp__main" data-cy="TodoList">
    {posts.map(post => (
      <TodoItems
        key={post.id}
        id={post.id}
        completed={post.completed}
        title={post.title}
        userId={post.userId}
      />
    ))}
  </section>
);
