/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { UpdateToDo } from '../UpdateTodo/updateTodo';
import { RemoveButton } from '../RemoveTodos/RemoveTodo';
import { Loader } from '../Loader/Loader';
import classNames from 'classnames';
import { Complete } from '../Complete/Complete';
import { CallUpdatingForm } from '../callUpdatingForm/callUpdatingForm';

type Props = {
  todo: Todo;
  handleLoading: (id: number, state: boolean) => void;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setErrorMesage: React.Dispatch<React.SetStateAction<string>>;
  loader: Record<number, boolean>;
};

export const Todos: React.FC<Props> = ({
  todo,
  handleLoading,
  setTodos,
  setErrorMesage,
  loader,
}) => {
  const id: number = todo.id;
  const [callUpdatingForm, setCallUpdatingForm] = useState<number>(0);
  const [oldValue, setOldValueToUpdatingForm] = useState<string>('');

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      <Complete
        todo={todo}
        handleLoading={handleLoading}
        setTodos={setTodos}
        setErrorMesage={setErrorMesage}
      />

      {callUpdatingForm !== id && (
        <CallUpdatingForm
          setCallUpdatingForm={setCallUpdatingForm}
          todo={todo}
          setOldValueToUpdatingForm={setOldValueToUpdatingForm}
        />
      )}
      {callUpdatingForm !== id && (
        <RemoveButton
          todo={todo}
          setTodos={setTodos}
          setErrorMesage={setErrorMesage}
          handleLoading={handleLoading}
        />
      )}
      {callUpdatingForm === id && (
        <UpdateToDo
          oldValue={oldValue}
          setCallUpdatingForm={setCallUpdatingForm}
          todo={todo}
          handleLoading={handleLoading}
          setTodos={setTodos}
          setErrorMesage={setErrorMesage}
        />
      )}
      {/* Overlay will cover the todo while it is being deleted or updated */}
      <Loader loader={loader} todoId={todo.id} />
    </div>
  );
};
