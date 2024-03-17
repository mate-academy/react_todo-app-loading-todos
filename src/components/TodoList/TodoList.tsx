import { useEffect } from 'react';

import TodoItem from '../TodoItem/TodoItem';

import { getTodos } from '../../api/todos';
import { useTodos } from '../../hooks/useTodos';
import { wait } from '../../utils/fetchClient';
import { Filter } from '../../types';

export const TodoList: React.FC = () => {
  const { todos, setTodos, filter, setError, setIsLoading } = useTodos();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setIsLoading(true);
        const fetchedTodos = await getTodos();

        setTodos(fetchedTodos);
      } catch {
        setError('Unable to load todos');
        setIsLoading(false);

        wait(3000).then(() => {
          setError('');
        });
      }
    };

    fetchTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.Active:
        return !todo.completed;
      case Filter.Completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
