import React from 'react';
import { Todo } from '../../types/Todo';
import { Errors } from '../../types/Errors';
import { SingleTodo } from '../SingleTodo/SingleTodo';

type Props = {
  todos: Todo[],
  setErrorType: (error: Errors) => void,
};

export const TodoList: React.FC<Props> = ({ todos, setErrorType }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => {
        return (
          <SingleTodo
            todo={todo}
            setErrorType={setErrorType}
          />
        );
      })}
    </section>
  );
};
