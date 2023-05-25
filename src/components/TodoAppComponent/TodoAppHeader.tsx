import cn from 'classnames';
import { useState } from 'react';
// import { Todo } from '../../types/Todo';
import { NewTodo } from './NewTodo';
import { useTodosContext } from '../../utils/TodosContext';

// interface PropsTodoAppHeader {
//   todos: Todo[];
// }
// { todos }: PropsTodoAppHeader

export const TodoAppHeader = () => {
  const [value, setValue] = useState('');

  const { todos } = useTodosContext();

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

      <NewTodo value={value} setValue={setValue} />
    </header>
  );
};
