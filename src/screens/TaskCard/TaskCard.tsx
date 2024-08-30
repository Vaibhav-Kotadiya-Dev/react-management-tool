import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './TaskCard.scss';
import { TASK_STATUS } from 'types/enums';

type Props = {
  id: string;
  title: string;
  onClick: (id: string, columnStatus: TASK_STATUS) => void;
  index: number;
  columnStatus: TASK_STATUS;
};

const DraggableRN: any = Draggable;

function TaskCard(props: Props) {
  const {
    id,
    title,
    onClick,
    index,
    columnStatus,
  } = props;
  return (
    <DraggableRN key={id} draggableId={id} index={index}>
      {provided => (
        <div
          className='taskCard'
          onClick={() => onClick(id, columnStatus)}
          role="presentation"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="taskCard__title">{title}</p>
          <p className='taskCard__id'>ID: {id}</p>
        </div>
      )}
    </DraggableRN>
  );
}
export default TaskCard;
