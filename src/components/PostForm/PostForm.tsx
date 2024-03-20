import { useEffect, useRef } from 'react';

export const PostForm: React.FC = () => {
  const todoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (todoInput.current) {
      todoInput.current.focus();
    }
  }, []);

  return (
    <form>
      <input
        data-cy="NewTodoField"
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
        ref={todoInput}
      />
    </form>
  );
};
