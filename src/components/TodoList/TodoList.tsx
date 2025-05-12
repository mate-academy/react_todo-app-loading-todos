import { useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';
import { Footer } from '../Footer/Footer';

type Props = {
  todos: Todo[];
};

export type Filter = 'all' | 'active' | 'completed';

export const TodoList: React.FC<Props> = ({ todos }) => {
  const [filter, setFilter] = useState<Filter>('all');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState<number[]>([]);

  const visibleTodos: Todo[] = useMemo(() => {
    switch (filter) {
      case 'all':
        return todos;

      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);
    }
  }, [todos, filter]);

  return (
    <>
      <section className="todoapp__main" data-cy="TodoList">
        {visibleTodos.map(todo => (
          <TodoItem
            todo={todo}
            loading={loading.includes(todo.id)}
            key={todo.id}
          />
        ))}
      </section>
      {todos.length > 0 && (
        <Footer
          filter={filter}
          setFilter={setFilter}
          statuses={todos.map(todo => todo.completed)}
        />
      )}
    </>
  );
};
