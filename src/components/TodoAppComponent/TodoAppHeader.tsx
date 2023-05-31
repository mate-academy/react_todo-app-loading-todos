import cn from 'classnames';
import { useState } from 'react';
import { NewTodo } from './NewTodo';
import { useTodosContext } from '../../utils/TodosContext';

export const TodoAppHeader = () => {
  const [value, setValue] = useState('');

  const { todos } = useTodosContext();
  const isActive = todos.filter(todo => !todo.completed).length > 0;

  return (
    <header className="todoapp__header">
      {
        //   eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={cn({
            'todoapp__toggle-all active': isActive,
            'todoapp__toggle-all': !isActive,
          })}
        />
      }

      <NewTodo value={value} setValue={setValue} />
    </header>
  );
};
