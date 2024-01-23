import { Todo } from '../../types/Todo';
import { TodoTitleField } from '../TodoTitleField';

type Props = {
  filteredTodos: Todo[];
  handleError: (errorMessage: string) => void;
  updateChecked: (todo: Todo) => void;
};

export const TodoList:React.FC<Props> = (
  {
    filteredTodos,
    handleError,
    updateChecked,
  },
) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.length !== 0
      && (
        <form>
          {filteredTodos.map((todo) => (
            <TodoTitleField
              todo={todo}
              filteredTodos={filteredTodos}
              key={todo.id}
              handleError={handleError}
              updateChecked={updateChecked}
            />
          ))}
        </form>
      )}
    </section>
  )
};
