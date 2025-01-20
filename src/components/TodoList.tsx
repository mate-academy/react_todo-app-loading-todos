import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  completeTodo: (todoId: number) => void;
  changingTodo: Todo | undefined;
  setChangingTodo: (tochangingTododoId: Todo | undefined) => void;
  changedTitle: string;
  setChangedTitle: (changedTitle: string) => void;
  deleteTodo: (todoId: number) => void;
  handleTitleChange: (event: React.FormEvent, updatedTodo: Todo) => void;
  loadingTodos: Todo[] | null;
};

export const TodoList: React.FC<Props> = ({
  todos,
  completeTodo,
  changingTodo,
  setChangingTodo,
  changedTitle,
  setChangedTitle,
  deleteTodo,
  handleTitleChange,
  loadingTodos,
}) => (
  <>
    {todos.map(todo => {
      return (
        <TodoInfo
          todo={todo}
          completeTodo={completeTodo}
          changingTodo={changingTodo}
          setChangingTodo={setChangingTodo}
          changedTitle={changedTitle}
          setChangedTitle={setChangedTitle}
          deleteTodo={deleteTodo}
          handleTitleChange={handleTitleChange}
          loadingTodos={loadingTodos}
          key={todo.id}
        />
      );
    })}
  </>
);
