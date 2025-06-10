import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoIdem';

type Props = {
  filteredTodos: Todo[];
  isLoading: boolean;
  toggleTodoCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodoTitle: (id: number, newTitle: string) => void;
};

export const TodoList: React.FC<Props> = ({
  filteredTodos,
  isLoading,
  toggleTodoCompleted,
  deleteTodo,
  updateTodoTitle,
}) => {
  const [editingId, setEditingId] = useState<number>();
  const [editInput, setEditInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const editor = (todo: Todo) => {
    setEditingId(todo.id);
    setEditInput(todo.title);
  };

  const handleEditInput = (e: ChangeEvent<HTMLInputElement>) =>
    setEditInput(e.target.value);

  const handleSave = useCallback(() => {
    if (editingId !== undefined) {
      const trimmed = editInput.trim();

      if (trimmed) {
        updateTodoTitle(editingId, trimmed);
      }

      setEditingId(undefined);
      setEditInput('');
    }
  }, [editInput, editingId, updateTodoTitle]);

  useEffect(() => {
    if (editingId !== undefined && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        editingId !== undefined &&
        inputRef.current &&
        event.target instanceof HTMLElement &&
        !inputRef.current.contains(event.target)
      ) {
        handleSave();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [editingId, editInput, handleSave]);

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filteredTodos.map(todo => (
        <TodoItem
        key={todo.id}
          todo={todo}
          isLoading={isLoading}
          toggleTodoCompleted={toggleTodoCompleted}
          deleteTodo={deleteTodo}
          handleSave={handleSave}
          handleEditInput={handleEditInput}
          editor={editor}
          editInput={editInput}
          editingId={editingId}
          inputRef={inputRef}
        />
      ))}
    </section>
  );
};
