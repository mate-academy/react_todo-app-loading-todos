import { Todo } from '../../types/Todo';
import { TodoTitleField } from '../TodoTitleField';

type Props = {
  filteredTodos: Todo[];
  loading: boolean;
  handleError: (errorMessage: string) => void;
  updateChecked: (todo: Todo) => void;
};

export const TodoList:React.FC<Props> = (
  {
    filteredTodos,
    loading,
    handleError,
    updateChecked,
  },
) => {
  return (
    loading
      ? (
        <div data-cy="TodoLoader" className="modal overlay is-active">
          <div className="modal-background has-background-white-ter" />
          <div className="loader" />
        </div>
      )
      : (
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
          {/* { 'is-active' class puts this modal on top of the todo */}
        </section>
      )
  );
};
