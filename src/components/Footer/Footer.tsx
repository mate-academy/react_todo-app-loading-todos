import React from 'react';
import { SelectOption } from '../../App';
import { FooterFilter } from './FooterFillter';

type Props = {
  todosCounter: number;
  checkCompleted: boolean;
  option: SelectOption;
  setOption: (o: SelectOption) => void;
};

export const Footer: React.FC<Props> = ({
  option,
  todosCounter,
  checkCompleted,
  setOption,
}) => {
  return (
    <footer className="todoapp__footer" data-cy="Footer">
      <span className="todo-count" data-cy="TodosCounter">
        {todosCounter} items left
      </span>

      <FooterFilter option={option} setOption={setOption} />

      {!checkCompleted && (
        <button
          type="button"
          className="todoapp__clear-completed"
          data-cy="ClearCompletedButton"
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
