import React from 'react';
import { Todo } from '../../types/Todo';

export type HeaderTypes = {
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setIsLoadingId: React.Dispatch<React.SetStateAction<number | null>>;
};
