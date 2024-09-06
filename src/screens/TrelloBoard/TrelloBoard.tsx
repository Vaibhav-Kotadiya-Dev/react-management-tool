import React, { useEffect, useState } from 'react';
import ImageLinks from 'utils/ImageLinks';
import { CircularProgress } from '@mui/material';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import SnackBarNotification from 'components/SnackBarNotification';
import SummaryModal from 'screens/SummaryModal';
import TaskCard from 'screens/TaskCard';
import { trelloBoardColumns } from './helper';
import './TrelloBoard.scss';
import { AlertTypeProps, SnackBarNotificationProps } from 'components/SnackBarNotification/SnackBarNotification';
import { TASK_STATUS, TASK_SUMMARY_MODAL_STATUS } from 'types/enums';
import TicketService from 'services/Ticket'
import { toast } from 'react-toastify';

const DragDropContextRN: any = DragDropContext;
const DroppableRN: any = Droppable;

type Props = {
  projectId: number;
};

function TrelloBoard(props: Props) {
  const closedNotificationInitialState = {
    isOpen: false,
    alertTitle: '',
    alertDescription: '',
    alertType: AlertTypeProps.SUCCESS,
  };

  const { projectId } = props;

  const [dndTasks, setDndTasks] = useState<any>({
    [TASK_STATUS.Open]: [],
    [TASK_STATUS.InProgress]: [],
    [TASK_STATUS.InReview]: [],
    [TASK_STATUS.Completed]: [],
  });
  const [ticketId, setTicketId] = useState<number | undefined>(undefined);
  const [
    summaryModalStatus,
    setSummaryModalStatus,
  ] = useState<TASK_SUMMARY_MODAL_STATUS | undefined>();
  const [selectedColumnStatus, setSelectedColumnStatus] = useState<TASK_STATUS | undefined>();
  const [notificationDetails, setNotificationDetails] = useState<Omit<SnackBarNotificationProps, 'closeNotification'>>(closedNotificationInitialState);
  const [loading, setLoading] = useState<boolean>(false);

  const columnData = trelloBoardColumns();

  function closeNotification() {
    setNotificationDetails(closedNotificationInitialState);
  }

  const fetchTickets = async () => {
    try {
      const response = await TicketService.fetchTickets({
        projectId,
      })
      if (response?.data) {
        setDndTasks(response?.data)
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }

  const fetchTicketsOnMount = async () => {
    try {
      setLoading(true)
      const response = await TicketService.fetchTickets({
        projectId,
      })
      if (response?.data) {
        setDndTasks(response?.data)
      }
      setLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false)
    }
  }

  async function onDragEnd(result: DropResult) {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId) return;


    const sourceColumn = source.droppableId as TASK_STATUS;

    const destinationColumn = destination.droppableId as TASK_STATUS;
    const movingCard = dndTasks[sourceColumn]?.find((_, index) => index === source.index);
    setDndTasks(preState => ({
      ...preState,
      [sourceColumn]: [...preState[sourceColumn].filter((_, index) => index !== source.index)],
      [destinationColumn]: preState && [{ ...movingCard }, ...preState[destinationColumn]],
    }));
    try {
      await TicketService.updateTicket({
        startDate: movingCard?.startDate,
        title: movingCard?.title, 
        description: movingCard?.description,
        endDate: movingCard?.endDate,
        status: destination.droppableId,
        projectId,
        ticketId: movingCard?.id,
      })
    } catch (error) {
      console.log('e onDragEnd()', error);
    } finally {
      fetchTickets();
    }
  }

  function handleTaskCardClick(id: number | undefined, columnStatus: TASK_STATUS) {
    if (id) {
      setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.SUMMARY);
      setSelectedColumnStatus(columnStatus);
    } else {
      setSummaryModalStatus(undefined);
    }
    setTicketId(id);
  }

  function initiateAddNewTask(status: TASK_STATUS) {
    setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.CREATE);
    setSelectedColumnStatus(status);
  }

  function handleCloseSummaryModal(isFromEdit?: boolean) {
    if (!isFromEdit) {
      setTicketId(undefined);
      setSummaryModalStatus(undefined);
      setSelectedColumnStatus(undefined);
    } else {
      setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.SUMMARY);
    }
  }

  useEffect(() => {
    fetchTicketsOnMount()
    // eslint-disable-next-line
  }, []);

  return (
    <DragDropContextRN onDragEnd={onDragEnd}>
      <section className="trello_container">
        <SnackBarNotification {...{ ...notificationDetails, closeNotification }} />
        <div className="different_board_column">
          {loading ? (
            <div className="loader_for_task">
              <CircularProgress />
            </div>
          ) : (
            columnData?.map(column => (
              <div className="single_column" key={column.name}>
                <div className="single_column__header mb-3">
                  <img className="single_column__header__image" src={column.icon} alt="watching" />
                  <p className="single_column__header__title">{column.name}</p>
                </div>
                <div className="single_column__vertical_scroll">
                  <DroppableRN droppableId={column.status}>
                    {provided => (
                      <div className="single_column__list_container" ref={provided.innerRef}>
                        <div
                          className="create_task_container"
                          role="presentation"
                          onClick={() => initiateAddNewTask(column.status)}
                        >
                          <img
                            className="create_task_image"
                            src={ImageLinks.whitePlus}
                            alt="create_task"
                          />
                          <p className="create_task_text">Add task</p>
                        </div>
                        {dndTasks[column.status].length ? (
                          dndTasks[column.status].map(
                            (task, index) => !!task && (
                              <TaskCard
                                key={task.id?.toString()}
                                id={task.id?.toString()}
                                title={task.title}
                                onClick={handleTaskCardClick}
                                index={index}
                                columnStatus={column.status}
                              />
                            ),
                          )
                        ) : (
                          <div className="no_card_container">
                            <img
                              className="no_card_container__image"
                              src={ImageLinks.noTask}
                              alt="empty"
                            />
                            <p className="no_card_container__text">
                              No task yet.
                            </p>
                          </div>
                        )}
                        {provided.placeholder}
                      </div>
                    )}
                  </DroppableRN>
                </div>
              </div>
            ))
          )}
        </div>
        {summaryModalStatus && (
          <SummaryModal
            ticketId={ticketId}
            summaryModalStatus={summaryModalStatus}
            setNotificationDetails={setNotificationDetails}
            createTaskInitialStatus={selectedColumnStatus}
            handleCloseSummaryModal={handleCloseSummaryModal}
            setSummaryModalStatus={setSummaryModalStatus}
            projectId={projectId}
            fetchTickets={fetchTickets}
          />
        )}
      </section>
    </DragDropContextRN>
  );
}
export default TrelloBoard;
