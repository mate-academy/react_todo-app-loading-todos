import { EAction } from './Action.enum';
import { IError } from './Error.interface';
import { ITodo } from './Todo.interface';
import { IUser } from './User.interface';
import { ILoader } from './Loader.interface';
import { EFilterBy } from './FilterBy.enum';

import { RequireAtLeastOne } from './helpers';
import { ITodoAnimation } from './TodoAnimation.interface';

export interface IAction {
  type: EAction,
  todos?: ITodo[],
  user?: IUser,
  todo?: ITodo,
  loader?: ILoader;
  animations?: ITodoAnimation[];
  error?: RequireAtLeastOne<IError, 'message' | 'show'>,
  filterBy?: EFilterBy;
}
