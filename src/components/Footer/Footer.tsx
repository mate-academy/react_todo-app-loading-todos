import { FC, useContext, useEffect, useState } from 'react';
import { StateContext } from '../../lib/TodosContext';
import { Filters } from '../Filters/Filters';

export const Footer: FC = () => {
  const { todos, setTodos } = useContext(StateContext);
  const [isChecked, setIsChecked] = useState(false);
  const countTodos = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    setIsChecked(todos.every(todo => todo.completed));
  }, [todos]);

  const clickOnClearCompleteTodo = () => {
    const newTodos = todos.map(todo => ({
      ...todo,
      completed: !isChecked,
    }));

    setTodos(newTodos);
  };

  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {countTodos} items left
      </span>

      <Filters />

      <button
        type="button"
        className="todoapp__clear-completed"
        data-cy="ClearCompletedButton"
        onClick={clickOnClearCompleteTodo}
        disabled={isChecked}
      >
        Clear completed
      </button>
    </footer>
  );
};
