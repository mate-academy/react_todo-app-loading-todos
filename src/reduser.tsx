import { Todo } from './types/Todo';

enum ActionType {
  LOAD__TODO = 'loading',
  ADD__TODO = 'adding',
  DELETE__TODO = 'deleting',
  UPDATE__TODO = 'updating',
}

interface CountAction {
  type: ActionType,
  payload: any
}

export const reducer = (state: Todo[], action: CountAction): Todo[] => {
  switch (action.type) {
    case ActionType.LOAD__TODO: {
      return [];
    }

    case ActionType.ADD__TODO: {
      return [];
    }

    case ActionType.DELETE__TODO: {
      return [];
    }

    case ActionType.UPDATE__TODO: {
      return [];
    }

    default: return state;
  }
};

// const actions = {

// }
