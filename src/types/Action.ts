import { ActionTypes } from './ActionTypes';
import { Error } from './Error';
import { Todo } from './Todo';
import { User } from './User';
import { Loader } from './Loader';

import { RequireAtLeastOne } from './helpers';

export interface Action {
  type: ActionTypes,
  todos?: Todo[],
  user?: User,
  todo?: Todo,
  loader?: Loader;
  error?: RequireAtLeastOne<Error, 'message' | 'show'>,
}
