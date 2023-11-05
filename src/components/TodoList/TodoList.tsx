import { useEffect, useState } from 'react';
import { TodoItem } from './TodoListElements/TodoItem';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';
import { Footer } from './Footer';

type Props = {
  userId: number;
};

export const TodoList: React.FC<Props> = ({ userId }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMesage] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos(userId)
      .then(setTodos)
      .catch(() => {
        setErrorMesage('Unable to load todos');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      <p>{errorMessage}</p>

      { todos.map(todo => (
        <TodoItem
          title={todo.title}
          key={todo.id}
          completed={todo.completed}
          isLoading={loading}
        />
      ))}

      { todos.length > 0 && (
        <Footer todosQty={todos.length} />
      )}

    </section>
  );
};
