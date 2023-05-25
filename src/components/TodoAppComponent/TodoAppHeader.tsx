import cn from 'classnames';
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { NewTodo } from './NewTodo';

interface PropsTodoAppHeader {
  todos: Todo[];
}

export const TodoAppHeader = ({ todos }: PropsTodoAppHeader) => {
  const [value, setValue] = useState('');

  return (
    <header className="todoapp__header">
      {
        //   eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          className={cn({
            'todoapp__toggle-all active': todos
              .filter(todo => !todo.completed).length,
            'todoapp__toggle-all': !todos
              .filter(todo => !todo.completed).length,
          })}
        />
      }

      {/* Add a todo on form submit */}
      <NewTodo value={value} setValue={setValue} />
    </header>
  );
};
