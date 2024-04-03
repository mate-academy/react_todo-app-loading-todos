import { ChangeEvent, useState } from 'react';
import { deleteTodos, updateTodos } from '../api/todos';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[];
  isLoading: boolean;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoList: React.FC<Props> = ({ todos, isLoading, setTodos }) => {
  const [updatingTodo, setUpdatingTodo] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const onDelete = (id: number) => {
    setIsDeleting(true);

    deleteTodos(id)
      .then(() => setTodos(todos.filter(todo => todo.id !== id)))
      .finally(() => setIsDeleting(false));
  };

  const onPatch = (
    event: React.FormEvent<HTMLFormElement> | ChangeEvent<HTMLInputElement>,
    todo: Todo,
  ) => {
    event.preventDefault();

    setUpdatingTodo(todo.id);

    updateTodos(todo.id, todo)
      .then((updatedTodo: Todo) =>
        setTodos((currentTodos: Todo[]) =>
          currentTodos.map(item =>
            item.id === updatedTodo.id ? updatedTodo : item,
          ),
        ),
      )
      .finally(() => {
        setUpdatingTodo(null);
        setSelectedTodo(null);
      });
  };

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          todo={todo}
          key={todo.id}
          setSelectedTodo={setSelectedTodo}
          setUpdatingTodo={setUpdatingTodo}
          updatingTodo={updatingTodo}
          isDeleting={isDeleting}
          selectedTodo={selectedTodo}
          onDelete={onDelete}
          onPatch={onPatch}
        />
      ))}

      <div data-cy="TodoLoader" className="modal overlay">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </section>
  );
};
