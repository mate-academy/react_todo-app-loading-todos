import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import cn from 'classnames';

import { Todo } from '../types/Todo';
import { USER_ID } from '../api/todos';

type Props = {
  onSubmit: (newTodo: Omit<Todo, 'id'>) => Promise<void>;
  onSetError: Dispatch<SetStateAction<string>>;
  areAllCompleted: boolean;
};

export const TodoForm: FC<Props> = ({
  onSubmit,
  onSetError,
  areAllCompleted,
}) => {
  const [todoTitle, setTodoTitle] = useState('');

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSetError('');

    setTodoTitle(event.target.value.trimStart());
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!todoTitle.length) {
      onSetError('Title should not be empty');

      return;
    }

    onSetError('');

    const newTodo = {
      completed: false,
      title: todoTitle.trim(),
      userId: USER_ID,
    };

    onSubmit(newTodo).then(() => setTodoTitle(''));
  };

  return (
    <header className="todoapp__header">
      <button
        type="button"
        className={cn('todoapp__toggle-all', { active: areAllCompleted })}
        data-cy="ToggleAllButton"
      />

      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoTitle}
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};
