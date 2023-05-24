/* eslint-disable jsx-a11y/control-has-associated-label */
import cn from 'classnames';
import { useEffect, useState } from 'react';
import { patchTodos } from '../../api/todos';
import { Todo } from '../../types/Todo';

type Props = {
  setTodoList:(todo: Todo[]) => void,
  todoList: Todo[],
  setError:(text: string) => void,
};

export const Header:React.FC<Props> = ({
  setTodoList,
  todoList,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [allActiveButton, setAllActiveButton] = useState(false);

  useEffect(() => setAllActiveButton(
    todoList.some(item => !item.completed),
  ));

  return (
    <header className="todoapp__header">
      {todoList.length !== 0 && (
        <button
          type="button"
          className={cn('todoapp__toggle-all',
            { active: !allActiveButton })}
          onClick={() => setTodoList(todoList.map(todo => {
            patchTodos(
              todo.id,
              { ...todo, completed: allActiveButton },
            );

            return { ...todo, completed: allActiveButton };
          }))}
        />
      )}

      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
    </header>
  );
};
