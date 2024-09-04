/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useReducer, useState, Dispatch, SetStateAction } from 'react';
import {
  Backdrop,
  CircularProgress,
  Fade,
  FormControl,
  MenuItem,
  Modal,
  Select,
  TextareaAutosize,
} from '@mui/material';
import ConfirmationModal from 'components/Modal/ConfirmationModal';
import { isAfter } from 'date-fns';
import { isEqual } from 'lodash';
import { TASK_STATUS, TASK_SUMMARY_MODAL_STATUS } from 'types/enums';
import { trelloBoardColumns } from 'screens/TrelloBoard/helper';
import {
  CreateEditTaskState,
  formatPreFilledState,
  initialCreateEditTaskState,
  reducerCreateEditTask,
} from 'screens/CreateEditTask/CreateEditTask.state';
import './SummaryModal.scss';
import SummaryModalDatePicker from './SummaryModalComponent/SummaryModalDatePicker/SummaryModalDatePicker';
import { AlertTypeProps } from 'components/SnackBarNotification/SnackBarNotification';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import EditOffIcon from '@mui/icons-material/EditOff';
import Button from 'components/Button';
import TicketService from 'services/Ticket'
import { TicketProps } from 'types/types';
import { toast } from 'react-toastify';

type props = {
  ticketId: number | undefined;
  projectId: number;
  summaryModalStatus?: TASK_SUMMARY_MODAL_STATUS;
  createTaskInitialStatus: TASK_STATUS | undefined;
  setNotificationDetails: Dispatch<SetStateAction<any>>;
  setSummaryModalStatus: Dispatch<SetStateAction<TASK_SUMMARY_MODAL_STATUS | undefined>>;
  handleCloseSummaryModal: (isFromEdit?: boolean) => void | VoidFunction;
};

function SummaryModal({
  ticketId,
  summaryModalStatus,
  setNotificationDetails,
  createTaskInitialStatus,
  handleCloseSummaryModal,
  setSummaryModalStatus,
  projectId,
}: props) {
  const descriptionMaxLength = 1000;
  const titleMaxLength = 500;
  const textAreaAlertLength = 30;

  const [savingInProgress, setSavingInProgress] = useState<boolean>(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

  const [deleteTaskConfirmationModal, setDeleteTaskConfirmationModal] = useState({
    isLoading: false,
    description: 'Are you sure?',
    okButtonText: 'Yes',
  });

  const [ticketSummary, setTicketSummary] = useState<TicketProps>({
    "id": null,
    "startDate": null,
    "title": null,
    "description": null,
    "endDate": null,
    "status": "IN_PROGRESS",
    "projectId": null
  })
  const [fetchingTicketSummary, setFetchingTicketSummary] = useState<boolean>(false);

  function initializer(initializerState = initialCreateEditTaskState) {
    if (ticketSummary?.id) {
      return formatPreFilledState(ticketSummary);
    }
    return {
      ...initializerState,
      [CreateEditTaskState.STATUS]: createTaskInitialStatus,
      [CreateEditTaskState.START_DATE]: new Date(),
      [CreateEditTaskState.END_DATE]: new Date(),
    };
  }

  const [state, dispatch] = useReducer(
    reducerCreateEditTask,
    initialCreateEditTaskState,
    initializer,
  );

  function updateStatusChangeState(status: TASK_STATUS) {
    dispatch({ type: CreateEditTaskState.STATUS, payload: status });
  }

  async function handleStatusChange(event: React.ChangeEvent<{ value: unknown }>) {
    updateStatusChangeState(event.target.value as TASK_STATUS);
  }

  function toggleDeleteConfirmationModel() {
    setShowDeleteConfirmationModal(prevState => !prevState);
  }
  async function deleteTask(id: number) {
    try {
      setDeleteTaskConfirmationModal(prevState => ({ ...prevState, isLoading: true }));
      const response = await TicketService.deleteTicket({ ticketId: ticketId })
      if (response?.data) {
        setNotificationDetails({
          isOpen: true,
          alertTitle: 'Task',
          alertDescription: 'Successfully removed',
          alertType: AlertTypeProps.SUCCESS,
        });
        toggleDeleteConfirmationModel();
        handleCloseSummaryModal();
      }
    } catch (err) {
      setDeleteTaskConfirmationModal(prevState => ({
        ...prevState,
        isLoading: false,
        description: 'Are you sure?',
        okButtonText: 'Yes',
      }));
    }
  }

  function onCancelButtonClick() {
    handleCloseSummaryModal();
    dispatch({ type: 'RESET', payload: initializer() });
  }
  function onDeleteButtonClick() {
    toggleDeleteConfirmationModel();
  }

  function handleCreateDateChange(date: Date) {
    dispatch({ type: CreateEditTaskState.START_DATE, payload: date });
    if (isAfter(new Date(date), new Date(state.endDate))) {
      dispatch({ type: CreateEditTaskState.END_DATE, payload: date });
    }
  }

  function handleEndDateChange(date: Date) {
    dispatch({ type: CreateEditTaskState.END_DATE, payload: date });
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: CreateEditTaskState.DESCRIPTION, payload: event.target.value });
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: CreateEditTaskState.TITLE, payload: event.target.value });
  }

  function handleDescriptionOnBlur(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: CreateEditTaskState.DESCRIPTION, payload: event.target.value.trim() });
  }

  function handleTitleOnBlur(event: React.ChangeEvent<HTMLTextAreaElement>) {
    dispatch({ type: CreateEditTaskState.TITLE, payload: event.target.value.trim() });
  }

  function createEditFailureNotification() {
    setNotificationDetails({
      isOpen: true,
      alertTitle: 'Task',
      alertDescription: 'Something went wrong. Please try again',
      alertType: AlertTypeProps.ERROR,
    });
  }

  const fetchTicketSummary = async () => {
    try {
      setFetchingTicketSummary(true)
      const response = await TicketService.fetchTicketSummary({
        ticketId,
      })
      const ticketObj = {
        id: response?.data?.id,
        startDate: response?.data?.startDate,
        title: response?.data?.title,
        description: response?.data?.description,
        endDate: response?.data?.endDate,
        status: response?.data?.status,
        projectId: response?.data?.projectId
      }
      setTicketSummary(ticketObj)
      setFetchingTicketSummary(false)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setFetchingTicketSummary(false)
    }
  }

  async function onSubmitTaskData() {
    try {
      setSavingInProgress(true);
      const payload = ({ ...state } as unknown) as any;
      if (ticketId) {
        payload.id = ticketId;
      }
      let response: any;
      if (summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.CREATE) {
        response = await TicketService.createTicket({
          startDate: state.startDate,
          title: state.title, 
          description: state.description,
          endDate: state.endDate,
          status: state.status,
          projectId,
        })
      } else {
        response = await TicketService.updateTicket({
          startDate: state.startDate,
          title: state.title, 
          description: state.description,
          endDate: state.endDate,
          status: state.status,
          projectId,
          ticketId: ticketId,
        })
      }
      if (response?.data) {
        setNotificationDetails({
          isOpen: true,
          alertTitle: 'Task',
          alertDescription: summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.CREATE
            ? 'Task has been created successfully'
            : 'Task has been updated successfully',
          alertType: AlertTypeProps.SUCCESS,
        });
      } else {
        createEditFailureNotification();
      }
    } catch (e) {
      createEditFailureNotification();
      dispatch({ type: 'RESET', payload: initializer() });
    } finally {
      if (summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.CREATE) {
        handleCloseSummaryModal();
      } else {
        fetchTicketSummary()
        setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.SUMMARY);
      }
      setSavingInProgress(false);
    }
  }

  function onSetTaskModalStatusToEdit() {
    setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.EDIT);
  }

  function onSetTaskModalStatusToSummary() {
    setSummaryModalStatus(TASK_SUMMARY_MODAL_STATUS.SUMMARY);
  }

  function handleModalClose() {
    handleCloseSummaryModal();
  }

  const isSaveButtonDisabled = isEqual(
    state,
    formatPreFilledState(
      summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.CREATE
        ? initializer(initialCreateEditTaskState)
        : ticketSummary,
    ),
  );

  useEffect(() => {
    if (ticketId) {
      fetchTicketSummary()
    }
    // eslint-disable-next-line
  }, [ticketId]);

  useEffect(() => {
    if (ticketSummary?.id) {
      dispatch({ type: 'RESET', payload: initializer() });
    }
    // eslint-disable-next-line
  }, [ticketSummary?.id]);

  const columnData = trelloBoardColumns();

  if (summaryModalStatus) {
    return (
      <Modal
        aria-labelledby="transition-modal"
        aria-describedby="transition-modal-description"
        className="summary_modal"
        open={!!summaryModalStatus}
        onClose={handleModalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!summaryModalStatus}>
          <div id="transition-modal" className="modal_children_container">
            {(!state || savingInProgress || fetchingTicketSummary) ? (
              <div className="loader">
                <CircularProgress size={30} />
                <p className="loading_text">{savingInProgress ? 'Saving' : 'Loading'}</p>
              </div>
            ) : (
              <div>
                <div className="modal_children_sub_container">
                  <div
                    className={summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.SUMMARY ? "summary_section summary_section_height" : "summary_section"}
                  >
                    <div className={`${(summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.SUMMARY || summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.EDIT) ? 'actionContainer' : 'actionContainerCreateTask'}`}>
                      {(summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.SUMMARY || summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.EDIT) && (
                        <div>
                          {/* @ts-ignore */}
                          {summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.EDIT ? (
                            <EditOffIcon className='cursor-pointer' color='action' onClick={onSetTaskModalStatusToSummary} />
                          ) : (
                            <EditIcon className='cursor-pointer' color='action' onClick={onSetTaskModalStatusToEdit} />
                          )}
                          <DeleteIcon className='cursor-pointer' color='error' onClick={onDeleteButtonClick} />
                        </div>
                      )}
                      <div>
                        <CloseIcon className='cursor-pointer' onClick={onCancelButtonClick} />
                      </div>
                    </div>
                    {summaryModalStatus !== TASK_SUMMARY_MODAL_STATUS.CREATE && (
                      <div>
                        <p className='summary_section_title'>ID: {ticketId}</p>
                      </div>
                    )}
                    <div className="details_first_section">
                      <div className="first_row_details">
                        <div className="start_end_status_container">
                          <div className="start_end_details">
                            <div className="calender_section_container">
                              <SummaryModalDatePicker
                                primaryDate={new Date(state.startDate)}
                                secondaryDate={new Date(state.endDate)}
                                text='Start date'
                                label='Start date'
                                modalStatus={summaryModalStatus}
                                onDateChange={handleCreateDateChange}
                                status={state[CreateEditTaskState.STATUS]}
                                showLegend={false}
                              />
                            </div>
                            <div className="calender_section_container">
                              <SummaryModalDatePicker
                                primaryDate={new Date(state.endDate)}
                                secondaryDate={new Date(state.endDate)}
                                minDate={new Date(state.startDate)}
                                text="End date"
                                label='End date'
                                modalStatus={summaryModalStatus}
                                onDateChange={handleEndDateChange}
                                isEndDate
                                status={state[CreateEditTaskState.STATUS]}
                                showLegend
                              />
                            </div>
                          </div>
                          {summaryModalStatus !== TASK_SUMMARY_MODAL_STATUS.SUMMARY && (
                            <div className="task_status_container">
                              <div>
                                <p className='task_status_container_label'>Select status</p>
                              </div>
                              <div>
                                <FormControl className="select_status_form">
                                  <Select
                                    className="select_status"
                                    autoWidth
                                    variant="outlined"
                                    labelId="simple-select-label"
                                    id="simple-select"
                                    value={state.status}
                                    onChange={handleStatusChange as any}
                                  >
                                    {columnData.map(status => (
                                      <MenuItem className="single_status" value={status.status} key={status.status}>
                                        <img
                                          className="pillar_image"
                                          src={status.icon}
                                          alt="status"
                                        />
                                        {' '}{status.name}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      {summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.SUMMARY
                        ? (
                          <>
                            <div className="description_title">
                              Title
                            </div>
                            <div className="description margin_bottom">{state?.title} </div>
                          </>
                        )
                        : (
                          <>
                            <div className="description_title">
                              Title
                            </div>
                            <TextareaAutosize
                              maxLength={titleMaxLength}
                              onChange={handleTitleChange}
                              className="customTitleTextarea"
                              value={state?.title}
                              placeholder='Enter title'
                              onBlur={handleTitleOnBlur}
                            />
                            <div className={`words_left ${titleMaxLength - state?.title?.length < textAreaAlertLength ? 'red' : ''}`}>
                              {` ${state?.title?.length}/${titleMaxLength} `}
                            </div>
                          </>
                        )}
                      {summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.SUMMARY
                        ? (
                          <>
                            <div className="description_title">
                              Description
                            </div>
                            <div className="description margin_bottom">{state?.description} </div>
                          </>
                        )
                        : (
                          <>
                            <div className="description_title">
                              Description
                            </div>
                            <TextareaAutosize
                              maxLength={descriptionMaxLength}
                              onChange={handleDescriptionChange}
                              className="customTextarea"
                              value={state?.description}
                              placeholder='Enter description'
                              onBlur={handleDescriptionOnBlur}
                            />
                            <div className={`words_left ${descriptionMaxLength - state?.description?.length < textAreaAlertLength ? 'red' : ''}`}>
                              {` ${state?.description?.length}/${descriptionMaxLength} `}
                            </div>
                          </>
                        )}
                    </div>
                    {summaryModalStatus !== TASK_SUMMARY_MODAL_STATUS.SUMMARY && (
                      <div className="save_update_btn_container">
                        <Button
                          text='Cancel'
                          className="cancelTaskButton"
                          onClick={onCancelButtonClick}
                        />
                        <Button
                          text={summaryModalStatus === TASK_SUMMARY_MODAL_STATUS.EDIT ? 'Save task' : 'Create task'}
                          className="saveEditButton"
                          onClick={onSubmitTaskData}
                          disabled={isSaveButtonDisabled}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            {showDeleteConfirmationModal && (
              <ConfirmationModal
                title='Delete task'
                description={deleteTaskConfirmationModal.description}
                isOpen={showDeleteConfirmationModal}
                onOk={() => deleteTask(Number(ticketId))}
                okButtonText={deleteTaskConfirmationModal.okButtonText}
                cancelButtonText='No'
                onCancel={toggleDeleteConfirmationModel}
                isOkButtonLoading={deleteTaskConfirmationModal.isLoading}
                cancelButtonStyle={{ width: '110px' }}
                okButtonStyle={{ color: '#C00000', width: '106px' }}
              />
            )}
          </div>
        </Fade>
      </Modal>
    );
  }
  return <></>;
}

export default SummaryModal;
