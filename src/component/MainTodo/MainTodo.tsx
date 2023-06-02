import React from 'react';
import { Todo } from '../../types/Todo';
import { MainList } from './MainList';

interface Props {
  formValue: Todo[];
}

export const MainTodo: React.FC<Props> = ({ formValue }) => {
  return (
    <section className="todoapp__main">
      {formValue.map((formList) => (
        <MainList
          formList={formList}
          key={formList.id}
        />
      ))}
    </section>
  );
};
