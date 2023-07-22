import { useState } from 'react';
import { Todo } from '../types/Todo';

export const TodoEditForm = ({ todo, onEdit }
: { todo: Todo; onEdit: (editedTodo: Todo) => void }) => {
  const [title, setTitle] = useState(todo.title);

  const handleTitleChange
  = (event: { target: { value: string; }; }) => {
    setTitle(event.target.value);
  };

  const handleBlur = () => {
    onEdit({ ...todo, title });
  };

  const handleKeyPress = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      onEdit({ ...todo, title });
    }
  };

  return (
    <input
      type="text"
      value={title}
      onChange={handleTitleChange}
      onBlur={handleBlur}
      onKeyPress={handleKeyPress}
      className="todo__title-field"
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus
    />
  );
};
