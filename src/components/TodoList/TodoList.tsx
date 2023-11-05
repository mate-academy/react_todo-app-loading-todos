import { useEffect, useState } from 'react';
import { TodoItem } from './TodoListElements/TodoItem';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../api/todos';

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
      <p>{loading}</p>
      <p>{errorMessage}</p>
      {todos.map(todo => (
        <p>{todo.id}</p>))}
      <TodoItem />
    </section>
  );
};
