import React from 'react';

type Props = {
  title: string,
  onTitleChange: (newTitle: string) => void,
};

export const NewFormTodo: React.FC<Props> = ({
  title,
  onTitleChange,
}) => {
  // const [title, setTitle] = useState('');

  return (
    <form>
      <input
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        value={title}
        onChange={({ target }) => {
          onTitleChange(target.value);
        }}
      />
    </form>
  );
};
