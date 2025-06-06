import { deleteTodo, patchTodo } from '../../api/todos';
import { Todo } from '../../types/Todo';
import { TodoElement } from '../TodoElement/TodoElement';

interface TodoappMainProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorNotification: (msg: string) => void;
}

export const TodoappMain: React.FC<TodoappMainProps> = ({
  todos,
  setTodos,
  setErrorNotification,
}) => {
  const handleTodoDelete = async (idTodo: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === idTodo ? { ...todo, isLoaded: false } : todo,
      ),
    );

    try {
      await deleteTodo(idTodo);

      setTimeout(() => {
        setTodos(prev => prev.filter(todo => todo.id !== idTodo));
      }, 500);
    } catch {
      setErrorNotification('Unable to delete a todo');
      setTimeout(() => setErrorNotification(''), 2000);
    }
  };

  const handleToggleStatus = (idTodo: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === idTodo ? { ...todo, isLoaded: false } : todo,
      ),
    );

    setTimeout(() => {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === idTodo
            ? { ...todo, completed: !todo.completed, isLoaded: true }
            : todo,
        ),
      );
    }, 500);
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === updatedTodo.id ? { ...todo, isLoaded: false } : todo,
      ),
    );

    try {
      const serverTodo = await patchTodo(updatedTodo.id, {
        title: updatedTodo.title,
      });

      setTodos(prev =>
        prev.map(todo =>
          todo.id === serverTodo.id
            ? { ...todo, title: updatedTodo.title, isLoaded: true }
            : todo,
        ),
      );
    } catch {
      setErrorNotification('Unable to update todo');
      setTimeout(() => setErrorNotification(''), 2000);
    }
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoElement
          key={todo.id}
          todo={todo}
          handleTodoDelete={handleTodoDelete}
          handleToggleStatus={handleToggleStatus}
          handleUpdateTodo={handleUpdateTodo}
        />
      ))}
    </section>
  );
};
