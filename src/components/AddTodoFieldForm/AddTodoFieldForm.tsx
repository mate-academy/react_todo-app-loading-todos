import {
  FormEvent,
  memo,
  useEffect,
  useRef,
} from 'react';

type Props = {
  onChangeTitle: (title: string) => void,
  title: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
};

export const AddTodoFieldForm: React.FC<Props> = memo(({
  onChangeTitle,
  title,
  onSubmit,
}) => {
  const newTodoField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (newTodoField.current) {
      newTodoField.current.focus();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <input
        data-cy="NewTodoField"
        type="text"
        ref={newTodoField}
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={event => onChangeTitle(event.target.value)}
      />
    </form>
  );
});
