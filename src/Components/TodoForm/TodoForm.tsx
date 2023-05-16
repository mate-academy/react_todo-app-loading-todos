import { FC, memo } from 'react';

interface Props {
  title: string;
  onChangeTitle: (title: string) => void;
}

export const TodoForm: FC<Props> = memo(({ title, onChangeTitle }) => {
  return (
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={(event) => onChangeTitle(event.target.value)}
      />
    </form>
  );
});
