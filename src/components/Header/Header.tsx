import { Todo } from '../../types/Todo';
import cn from 'classnames';

type Props = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  field: React.RefObject<HTMLInputElement>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

export const Header: React.FC<Props> = ({
  todos,
  setTodos,
  title,
  setTitle,
  field,
  setError,
}) => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      {todos.length > 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          data-cy="ToggleAllButton"
          onClick={() =>
            // eslint-disable-next-line @typescript-eslint/no-shadow
            setTodos(todos => {
              const allCompleted = todos.every(td => td.completed);

              return todos.map(todo => ({
                ...todo,
                completed: !allCompleted,
              }));
            })
          }
        />
      )}

      {/* Add a todo on form submit */}
      {/* <form onSubmit={handleSubmit}> */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={event => {
            setTitle(event.target.value);
            setError('');
          }}
          ref={field}
        />
      </form>
    </header>
  );
};
