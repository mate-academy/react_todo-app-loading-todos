import { useEffect } from 'react';
import { useAuthContext, useTodos } from '../../context';
import { getTodos } from '../../api/todos';
import { ErrorType, Todo } from '../../types';
import { TodoItem } from '../TodoItem';
import { Footer } from '../Footer';
import { Loader } from '../Loader';

export const TodoList = () => {
  const {
    loading,
    setLoading,
    todos,
    setTodos,
    filteredTodos,
    setErrors,
  } = useTodos();

  const userId = useAuthContext();

  useEffect(() => {
    if (userId) {
      setErrors(null);
      setLoading(true);
      getTodos(userId)
        .then((data) => {
          setTodos(data);
          setLoading(false);
        })
        .catch(() => {
          setErrors(ErrorType.Load);
          setLoading(false);
        });
    }
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {filteredTodos.length > 0 && (
        <section
          className="todoapp__main"
          data-cy="TodoList"
        >
          {filteredTodos.map((todo: Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </section>
      )}

      {todos.length > 0 && <Footer />}
    </>
  );
};

export default TodoList;
