import { Todo } from '../types/Todo';
import { TodosCounter } from './TodosCounter';
import { Filter } from './Filter';

type Props = {
  todos: Todo[];
  todoStatus: boolean | null;
  setTodoStatus: (value: boolean | null) => void;
};

export const Footer = ({ todos, todoStatus, setTodoStatus }: Props) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <TodosCounter todos={todos} />

      <Filter todoStatus={todoStatus} setTodoStatus={setTodoStatus} />

      {/* this button should be disabled if there are no completed todos */}
      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
      >
        Clear completed
      </button>
    </footer>
  );
};
