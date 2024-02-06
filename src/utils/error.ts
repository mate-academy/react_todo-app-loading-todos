export const getError = (errorTitle: string) => {
  switch (errorTitle) {
    case 'title':
      return 'Title should not be empty';
    case 'getTodos':
      return 'Unable to load todos';
    // case '':
    //   return 'Unable to add a todo';
    // case '':
    //   return 'Unable to delete a todo';
    // case '':
    //   return 'Unable to update a todo';
    default:
      return '';
  }
};
