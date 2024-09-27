import { useContext } from 'react';
import { FilterContainer } from './components/Filter';
import { todosContext } from '../../Store';
import { countCompletedTodos } from '../../utils/utils';

export const Footer: React.FC = () => {
  const { todos } = useContext(todosContext);
  const todosCount = todos.length - countCompletedTodos(todos);
  const completedTodos = countCompletedTodos(todos) > 0;

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCount} items left
      </span>
      <FilterContainer />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        disabled={!completedTodos}
      >
        Clear completed
      </button>
    </footer>
  );
};
