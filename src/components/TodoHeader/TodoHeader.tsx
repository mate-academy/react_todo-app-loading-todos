/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { ResponseError } from '../../types/enum';
import { getTodosFromServer, setTodoOnServer } from '../../api';

type Props = {
  todos: Todo[];
  toggleTodosActive: () => void;
  setShowFooter: (arg: boolean) => void;
  setRespError: (arg: ResponseError) => void;
  setTodos: (arg: Todo[]) => void;
  checkCompletedTodo: (arg: Todo[]) => void;
  userID: number;
};

export const TodoHeader: React.FC<Props> = ({
  todos,
  toggleTodosActive,
  setShowFooter,
  setRespError,
  setTodos,
  checkCompletedTodo,
  userID,
}) => {
  const [todoInput, setTodoInput] = useState('');

  const todoFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!todoInput.trim()) {
      return setRespError(ResponseError.EMPTY);
    }

    setTodoOnServer(todoInput.trim(), userID).then(() => {
      getTodosFromServer(userID).then((todoList) => {
        setTodos(todoList);
        checkCompletedTodo(todoList);
        setShowFooter(Boolean(todoList.length));
      });
    }).catch(() => setRespError(ResponseError.ADD));

    return setTodoInput('');
  };

  return (
    <header className="todoapp__header">
      {Boolean(todos.length) && (
        <button
          type="button"
          className="todoapp__toggle-all active"
          onClick={toggleTodosActive}
        />
      )}

      <form onSubmit={todoFormHandler}>
        <input
          type="text"
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          value={todoInput}
          onChange={(e) => {
            setRespError(ResponseError.NOT);
            setTodoInput(e.target.value);
          }}
        />
      </form>
    </header>
  );
};
