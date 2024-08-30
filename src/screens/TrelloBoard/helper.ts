import ImageLinks from 'utils/ImageLinks';
import { TASK_STATUS } from 'types/enums';

export function trelloBoardColumns() {
  const trelloBoardColumnsData = [
    { name: 'Open',
      icon: ImageLinks.toDo,
      status: TASK_STATUS.Open },
    {
      name: 'In progress',
      icon: ImageLinks.progress,
      status: TASK_STATUS.InProgress,
    },
    { name: 'In review',
      icon: ImageLinks.inReview,
      status: TASK_STATUS.InReview },
    { name: 'Completed',
      icon: ImageLinks.completed,
      status: TASK_STATUS.Completed },
  ];
  return trelloBoardColumnsData;
}
