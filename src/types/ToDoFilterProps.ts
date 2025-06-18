export type FilterStatus = 'all' | 'active' | 'completed';

export interface TodoFilterProps {
  query: string;
  setQuery: (value: string) => void;
  status: FilterStatus;
  setStatus: (status: FilterStatus) => void;
  isLoading?: boolean;
  isModalOpen?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
}
