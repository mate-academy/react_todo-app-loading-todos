import { Todo } from '../../types';
import { TodoItem } from '../TodoItem';
import { Footer } from '../Footer';
import { Loader } from '../Loader';
import { useTodos } from '../../context';

export const TodoList = () => {
  const {
    loading,
    todos,
    filteredTodos,
  } = useTodos();

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
