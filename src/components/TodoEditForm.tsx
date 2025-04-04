import React from 'react';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
  onUpdate: (id: number, title: string) => void;
  onDelete: (id: number) => void;
  onCancel: () => void;
}

export const TodoEditForm: React.FC<Props> = ({
  todo,
  onUpdate,
  onDelete,
  onCancel,
}) => {
  const [editTitle, setEditTitle] = React.useState(todo.title);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!editTitle.trim()) {
      onDelete(todo.id);

      return;
    }

    if (editTitle !== todo.title) {
      onUpdate(todo.id, editTitle);
    }

    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        data-cy="TodoTitleField"
        type="text"
        className="todo__title-field"
        placeholder="Empty todo will be deleted"
        value={editTitle}
        onChange={e => setEditTitle(e.target.value)}
        onBlur={handleSubmit}
        onKeyUp={e => {
          if (e.key === 'Escape') {
            onCancel();
            setEditTitle(todo.title);
          }
        }}
      />
    </form>
  );
};
