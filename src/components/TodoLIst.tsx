import React from 'react';
import { Todo } from '../types/Todo';
import { ToDo } from './Todo';
import { User } from '../types/User';

type Props = {
  List: Todo[],
  setErrorRemove: (value: boolean) => void,
  setErrorUpdate: (value: boolean) => void,
  setHidden: (value: boolean) => void,
  foundTodoList: (u: User) => void,
  isAdding: Todo | null,
  selectComplited: (todo: Todo) => Promise<void>,
  clearLoader: boolean,
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
    clearLoader,
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
          clearLoader={clearLoader}
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
          clearLoader={clearLoader}
        />
      )}
    </section>
  );
});
