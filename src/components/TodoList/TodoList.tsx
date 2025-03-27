/* eslint-disable react/display-name */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoField } from '../TodoField';

type Props = {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  changeCompleted: (id: number) => void;
  changeTodo: (id: number, newTitle: string) => void;
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  changeCompleted,
  changeTodo,
}) => {
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  // console.log('render list');

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoField
          key={todo.id}
          todo={todo}
          changeCompleted={changeCompleted}
          deleteTodo={deleteTodo}
          selectedTodoId={selectedTodoId}
          setSelectedTodoId={setSelectedTodoId}
          changeTodo={changeTodo}
        />
      ))}
    </section>
  );
};
