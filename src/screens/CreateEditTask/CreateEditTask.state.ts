/* eslint-disable @typescript-eslint/naming-convention */
import { TASK_STATUS } from 'types/enums';
import { isEqual } from 'date-fns';

export enum CreateEditTaskState {
  START_DATE = 'startDate',
  STATUS = 'status',
  DESCRIPTION = 'description',
  TITLE = 'title',
  END_DATE = 'endDate',
}

export type CreateEditTaskStateType = {
  [CreateEditTaskState.START_DATE]: Date;
  [CreateEditTaskState.STATUS]: TASK_STATUS;
  [CreateEditTaskState.DESCRIPTION]: string;
  [CreateEditTaskState.TITLE]: string;
  [CreateEditTaskState.END_DATE]: Date;
};

export const initialCreateEditTaskState: CreateEditTaskStateType = {
  [CreateEditTaskState.START_DATE]: new Date(),
  [CreateEditTaskState.STATUS]: TASK_STATUS.Open,
  [CreateEditTaskState.DESCRIPTION]: '',
  [CreateEditTaskState.TITLE]: '',
  [CreateEditTaskState.END_DATE]: new Date(),
};

export const reducerCreateEditTask = (
  state: CreateEditTaskStateType,
  action: { type: CreateEditTaskState | 'RESET'; payload: any },
) => {
  if (action.type === 'RESET') {
    return action.payload || initialCreateEditTaskState;
  }
  return { ...state, [action.type]: action.payload };
};

export function isTaskFilledPartially(
  state: CreateEditTaskStateType,
): boolean {
  const {
    status,
    startDate,
    endDate,
    ...rest
  } = state;
  if (!isEqual(new Date(startDate), initialCreateEditTaskState.startDate)) {
    return true;
  }

  if (!isEqual(new Date(endDate), initialCreateEditTaskState.endDate)) {
    return true;
  }

  // if (lodashIsEqual({
  //   pillar,
  //   status,
  // },
  // {
  //   pillar: initialCreateEditTaskState.pillar,
  //   status: initialCreateEditTaskState.status,
  // })
  // ) {
  //   return Object.values(rest).some(value => !!String(value).trim().length);
  // }
  return true;
}

export function formatPreFilledState(payload: any) {
  const {
    __typename,
    statusUpdateDate: _statusUpdateDate,
    ...rest
  } = payload;

  let formattedPrefilledInfo = {
    ...rest,
  };
  return formattedPrefilledInfo;
}

export function cleanTaskDBPayload(
  payload: any,
  taskStatus?: TASK_STATUS,
): any {
  const {
    __typename,
    statusUpdateDate: _statusUpdateDate,
    status,
    ...rest
  } = payload;
  const formattedPayload = {
    ...rest,
    status: taskStatus ?? status,
  };
  return formattedPayload;
}
