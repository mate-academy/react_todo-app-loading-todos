import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

type Props = {
  todos: Todo[];
  handleUpdateTodo: (todoId: number, todo: Todo) => void;
  onSetErrorMessage: (str: string) => void;
  isHasError: () => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  handleUpdateTodo,
  onSetErrorMessage,
  isHasError,
}) => {
  return (
    <ul className="todoapp__main">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          handleUpdateTodo={handleUpdateTodo}
          onSetErrorMessage={onSetErrorMessage}
          isHasError={isHasError}
        />
      ))}
    </ul>
  );
};
