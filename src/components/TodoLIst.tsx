import React from 'react';
import { Todo } from '../types/Todo';
import { ToDo } from './Todo';

import { User } from '../types/User';

type Props = {
  List: Todo[],
  setErrorRemove: React.Dispatch<React.SetStateAction<boolean>>,
  setErrorUpdate: React.Dispatch<React.SetStateAction<boolean>>,
  setHidden: React.Dispatch<React.SetStateAction<boolean>>,
  foundTodoList: (u: User) => void,
  isAdding: Todo | null,
  selectComplited: (todo: Todo) => Promise<void>,
};

export const TodoLIst: React.FC<Props> = React.memo((
  {
    List,
    setErrorRemove,
    setErrorUpdate,
    setHidden,
    foundTodoList,
    isAdding,
    selectComplited,
  },
) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {List.map(todo => (
        <ToDo
          todo={todo}
          foundTodoList={foundTodoList}
          setErrorUpdate={setErrorUpdate}
          setErrorRemove={setErrorRemove}
          setHidden={setHidden}
          selectComplited={selectComplited}
        />
      ))}

      {isAdding && (
        <ToDo
          todo={isAdding}
          foundTodoList={foundTodoList}
          setErrorUpdate={setErrorUpdate}
          setErrorRemove={setErrorRemove}
          setHidden={setHidden}
          selectComplited={selectComplited}
        />
      )}
    </section>
  );
});
