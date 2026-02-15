import { Todo } from '../../types/Todo';

import { TodoItem } from '../TodoItem/TodoItem';

type Props = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  onUpdate: (todo: Todo) => void;
  setErrorMessage: (message: string | null) => void;
  handleRemoveButton: (id: number) => void;
  setLoadingId: (id: number | null) => void;
  loadingId: number | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  onUpdate,
  setErrorMessage,
  handleRemoveButton,
  setLoadingId,
  loadingId,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {/* This is a completed todo */}

      {todos.map(todo => (
        <TodoItem
          todo={todo}
          toggleTodo={toggleTodo}
          onUpdate={onUpdate}
          setErrorMessage={setErrorMessage}
          handleRemoveButton={handleRemoveButton}
          setLoadingId={setLoadingId}
          loadingId={loadingId}
          key={todo.id}
        />
      ))}
    </section>
  );
};
