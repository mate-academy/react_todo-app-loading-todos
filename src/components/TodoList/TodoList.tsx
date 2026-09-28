import { Todo } from '../../types/Todo';
import { TodoComponent } from '../TodoComponent/TodoComponent';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  filteredTodos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[] | undefined>>;
  setError: (error: string) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  setTodos,
  setError,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoComponent
          todo={todo}
          setTodos={setTodos}
          setError={setError}
          key={todo.id}
        />
      ))}
    </section>
  );
};
