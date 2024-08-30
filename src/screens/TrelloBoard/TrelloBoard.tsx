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

const DragDropContextRN: any = DragDropContext;
const DroppableRN: any = Droppable;

type Props = {
  locationSlug?: string;
  locationName?: string;
};

function TrelloBoard(props: Props) {
  const closedNotificationInitialState = {
    isOpen: false,
    alertTitle: '',
    alertDescription: '',
    alertType: AlertTypeProps.SUCCESS,
  };

  const { locationSlug, locationName } = props;

  const tasks = {
    loading: false,
    data: {
      groupTasksInDCByStatus: {
        "OPEN": [
          {
            "id": "895576",
            "description": "Test description",
            "title": "Test title",
            "endDate": "2024-10-23T00:07:57.000Z",
            "status": "IN_PROGRESS",
          },
        ],
        "IN_PROGRESS": [
          {
            "id": "895575",
            "description": "Test description",
            "title": "Test title",
            "endDate": "2024-04-23T00:07:57.000Z",
            "status": "IN_PROGRESS",
          },
        ],
        "IN_REVIEW": [
          {
            "id": "895571",
            "description": "Test description",
            "title": "Test title",
            "endDate": "2024-04-23T00:07:57.000Z",
            "status": "IN_PROGRESS",
          },
        ],
        "COMPLETED": [],
      }
    },
    refetch: null,
  }

  const [dndTasks, setDndTasks] = useState<any>({
    [TASK_STATUS.Open]: [],
    [TASK_STATUS.InProgress]: [],
    [TASK_STATUS.InReview]: [],
    [TASK_STATUS.Completed]: [],
  });
  const [taskId, setTaskId] = useState<string | undefined>(undefined);
  const [
    summaryModalStatus,
    setSummaryModalStatus,
  ] = useState<TASK_SUMMARY_MODAL_STATUS | undefined>();
  const [selectedColumnStatus, setSelectedColumnStatus] = useState<TASK_STATUS | undefined>();
  const [notificationDetails, setNotificationDetails] = useState<Omit<SnackBarNotificationProps, 'closeNotification'>>(closedNotificationInitialState);
  const [loading, setLoading] = useState({
    count: 0,
    value: false,
  });

  const columnData = trelloBoardColumns();

  function closeNotification() {
    setNotificationDetails(closedNotificationInitialState);
  }

  async function updateTaskColumns() {
    try {
      if (tasks.refetch) {
        await tasks.refetch();
      }
    } catch (error) {
      console.log('updateTaskColumns e()', error);
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
      // await setTaskStatus({
      //   variables: {
      //     taskId: Number(movingCard?.id),

      //     status: destination.droppableId as TASK_STATUS,
      //     isOwnerCheckSurpassed: true,
      //   },
      // });
    } catch (error) {
      console.log('e onDragEnd()', error);
    } finally {
      updateTaskColumns();
    }
  }

  function handleTaskCardClick(id: string | undefined, columnStatus: TASK_STATUS) {
    if (id) {
      setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.SUMMARY);
      setSelectedColumnStatus(columnStatus);
    } else {
      setSummaryModalStatus(undefined);
    }
    setTaskId(id);
  }

  function initiateAddNewTask(status: TASK_STATUS) {
    setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.CREATE);
    setSelectedColumnStatus(status);
  }

  function handleCloseSummaryModal(isFromEdit?: boolean) {
    console.log({ isFromEdit });
    if (!isFromEdit) {
      setTaskId(undefined);
      setSummaryModalStatus(undefined);
      setSelectedColumnStatus(undefined);
      updateTaskColumns();
    } else {
      setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.SUMMARY);
    }
  }

  useEffect(() => {
    if (!taskId) {
      updateTaskColumns();
    }
    // eslint-disable-next-line
  }, [taskId]);

  useEffect(() => {
    if (!tasks.loading) {
      setLoading(prevLoading => ({
        count: prevLoading.count,
        value: false,
      }));
    } else if (tasks.loading && loading.count === 0) {
      setLoading({
        count: 1,
        value: true,
      });
    }
  }, [tasks.loading, loading.count]);

  useEffect(() => {
    if (tasks?.data?.groupTasksInDCByStatus) {
      setDndTasks(
        tasks?.data?.groupTasksInDCByStatus as any,
      );
    }
    // eslint-disable-next-line
  }, []);

  return (
    <DragDropContextRN onDragEnd={onDragEnd}>
      <section className="trello_container">
        <SnackBarNotification {...{ ...notificationDetails, closeNotification }} />
        <div className="different_board_column">
          {loading.value ? (
            <div className="loader_for_task">
              <CircularProgress />
            </div>
          ) : (
            columnData.map(column => (
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
                                key={task.id}
                                id={task.id}
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
            locationSlug={locationSlug}
            locationName={locationName}
            taskId={taskId}
            summaryModalStatus={summaryModalStatus}
            setNotificationDetails={setNotificationDetails}
            createTaskInitialStatus={selectedColumnStatus}
            handleCloseSummaryModal={handleCloseSummaryModal}
            setSummaryModalStatus={setSummaryModalStatus}
          />
        )}
      </section>
    </DragDropContextRN>
  );
}
export default TrelloBoard;
