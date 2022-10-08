import { FilterType } from '../Header/HeaderPropTypes';

export type Props = {
  countOfItems: number;
  setFelterType: (type :FilterType) => void;
  filterType: FilterType;
  clearCompleted: () => void;
  countOfItemsLeft: number;
  todosLength: number;
};
