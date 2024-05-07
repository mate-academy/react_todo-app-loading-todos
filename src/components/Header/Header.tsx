import { Todo } from '../../types/Todo';
import cn from 'classnames';

interface Props {
  input: string;
  setInput: (b: string) => void;
  setError: (b: string) => void;
  setPosts: (b: Omit<Todo, 'id'>) => void;
  todos: Todo[];
}

export const Header = ({
  input,
  setInput,
  setError,
  setPosts,
  todos,
}: Props) => {
  const AddPost = () => {
    const newPost = {
      title: input,
      userId: 583,
      completed: false,
    };

    setPosts(newPost);
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={cn('todoapp__toggle-all', {
          active: todos.every(todo => todo.completed),
        })}
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
              if (input.trim()) {
                event.preventDefault();
                AddPost();
              } else {
                setInput('');
                setError('empty');
              }
            }
          }}
        />
      </form>
    </header>
  );
};
