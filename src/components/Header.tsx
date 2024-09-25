// import React, { useState } from 'react';

// interface Props {
//   onAddTodo: (title: string) => void;
// }

// export const Header: React.FC<Props> = ({ onAddTodo }) => {
//   const [newTodo, setNewTodo] = useState('');

//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (newTodo.trim()) {
//       onAddTodo(newTodo);
//       setNewTodo('');
//     }
//   };

//   return (
//     <header className="todoapp__header">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           className="todoapp__new-todo"
//           placeholder="What needs to be done?"
//           value={newTodo}
//           onChange={(e) => setNewTodo(e.target.value)}
//           autoFocus
//         />
//       </form>
//     </header>
//   );
// };

import { Todo } from '../types/Todo';

interface HeaderProps {
  todos: Todo[];
  onChange: () => void;
  onAddTodo: () => Promise<void>;
  title: string;
  setTitle: (string: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  todos,
  onChange,
  onAddTodo,
  title,
  setTitle,
}) => {
  const completedTodo = todos.filter(todo => todo.completed).length;
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onAddTodo();
  };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className={`todoapp__toggle-all ${completedTodo ? 'active' : ''}`}
        data-cy="ToggleAllButton"
        onClick={onChange}
      />

      {/* Add a todo on form submit */}
      <form onSubmit={handleSubmit}>
        <input
          data-cy="NewTodoField"
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={title}
          onChange={e => setTitle(e.target.value)}
          autoFocus
        />
      </form>
    </header>
  );
};
