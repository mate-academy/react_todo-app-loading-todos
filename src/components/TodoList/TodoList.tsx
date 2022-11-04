import { Todo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';
import { Error, ErrorCloser } from '../../types/Error';

interface Todos {
  todos: Todo[]
  update: () => void
  errorHandler: (error: Error) => void
  errorCloser: (error: ErrorCloser) => void
}

export const TodoList: React.FC<Todos> = ({
  todos,
  update,
  errorHandler,
  errorCloser,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
          update={update}
          errorHandler={errorHandler}
          errorCloser={errorCloser}
        />
      ))}
    </section>
  );
};
