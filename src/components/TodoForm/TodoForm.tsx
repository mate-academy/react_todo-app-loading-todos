import { ChangeEvent, FC, useState } from 'react';
import { addTodo, USER_ID } from '../../api/todos';

export const TodoForm: FC = ({}) => {
  const [text, setText] = useState('');
  const onTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const onTodoSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    if (!text) {
      return;
    }

    e.preventDefault();
    setText('');
    addTodo({
      completed: false,
      title: text,
      userId: USER_ID,
    });
  };

  return (
    <form onSubmit={onTodoSubmit}>
      <input
        data-cy="NewTodoField"
        value={text}
        onChange={onTextChange}
        type="text"
        className="todoapp__new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};
