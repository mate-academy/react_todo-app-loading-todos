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
}) => {
  const handleTodoDelete = (idTodo: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === idTodo ? { ...todo, isLoaded: false } : todo,
      ),
    );

    setTimeout(() => {
      setTodos(prev => prev.filter(todo => todo.id !== idTodo));
    }, 500);
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

  const handleUpdateTodo = (updatedTodo: Todo) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === updatedTodo.id ? { ...todo, isLoaded: false } : todo,
      ),
    );

    // Через 500 мс обновляем сам todo и ставим isLoaded: true
    setTimeout(() => {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === updatedTodo.id
            ? { ...updatedTodo, isLoaded: true }
            : todo,
        ),
      );
    }, 500);
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
