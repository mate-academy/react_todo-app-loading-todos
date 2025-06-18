export type OptionsError = 'load' | 'add' | 'delete' | 'update' | 'empty';

export interface NotificationsProps {
  isVisible: boolean;
  message: string | null;
  onClose: () => void;
}
