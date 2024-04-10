import React, { useEffect, useRef, useState } from 'react';
// import { Todo } from '../../types/Todo';
// import { DispatchContext, StateContext } from '../../Store';
// import { USER_ID } from '../../api/todos';
// import { client } from '../../utils/fetchClient';

// const getMaxId = (todos: Todo[]) => {
//   const maxId = Math.max(...todos.map(todo => todo.id));

//   return maxId + 1;
// };

export const Header: React.FC = () => {
  const [title, setTitle] = useState('');
  // const { todos } = useContext(StateContext);
  // const dispatch = useContext(DispatchContext);
  const textField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (textField.current) {
      textField.current.focus();
    }
  }, []);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const data = {
  //     id: getMaxId(todos) || 0,
  //     title: title,
  //     completed: false,
  //     userId: USER_ID,
  //   };

  //   client.post('/todos', data).then(() => {
  //     dispatch({ type: 'addTodo', todo: data });
  //     setTitle('');
  //   });
  // };

  return (
    <header className="todoapp__header">
      {/* this button should have `active` class only if all todos are completed */}
      <button
        type="button"
        className="todoapp__toggle-all active"
        data-cy="ToggleAllButton"
      />

      {/* Add a todo on form submit */}
      <form>
        <input
          ref={textField}
          data-cy="NewTodoField"
          value={title}
          onChange={e => setTitle(e.target.value)}
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
        />
      </form>
    </header>
  );
};
