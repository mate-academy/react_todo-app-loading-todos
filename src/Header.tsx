import { Todo } from './types/Todo';

type Props = {
  todos: Todo[];
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Header: React.FC<Props> = ({ todos }) => {
  // const [title, setTitle] = useState('');

  // const hasActiveTodos = todos.some(todo => !todo.completed);

  return (
    <header className="todoapp__header">
      {/* this buttons is active only if there are some active todos */}
      {/* <button
        type="button"
        className={`todoapp__toggle-all ${hasActiveTodos ? 'active' : ''}`}
        data-cy="ToggleAllButton"
      /> */}

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
