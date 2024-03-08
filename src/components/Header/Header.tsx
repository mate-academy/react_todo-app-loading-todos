import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
        aria-label="toggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};

// import { Todo } from '../../types/Todo';
// type Props = {
//   todos: Todo[];
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
// };
// { todos, setTodos }
// <Props>
// const [title, setTitle] = useState('');

// const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
//   setTitle(event.target.value);
// };
// const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
//     event.preventDefault();

//     setTodos([
//       ...todos,
//       {
//         id: +new Date(),
//         userId,
//         title,
//         completed: false,
//       },
//     ]);
//   };
// onSubmit={onSubmit}
// value={title}
// onChange={handleTitle}
