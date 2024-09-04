import React from 'react';
import ImageLinks from 'utils/ImageLinks';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { enUS } from '@mui/x-date-pickers/locales';
import { differenceInDays } from 'date-fns';
import { getTranslatedDateTimeValue } from 'utils/dateHelpers';
import { TASK_STATUS, TASK_SUMMARY_MODAL_STATUS } from 'types/enums';
import './SummaryModalDatePickerStyle.scss';
import * as styles from './SummaryModalDatePickerStyles';

const DateLocale = enUS.components.MuiLocalizationProvider.defaultProps.localeText;

type SummaryModalDatePickerProps = {
  primaryDate: Date;
  text: string;
  secondaryDate: Date;
  modalStatus: TASK_SUMMARY_MODAL_STATUS;
  status: TASK_STATUS;
  onDateChange: (date: any) => void;
  showTimePicker?: boolean;
  minDate?: Date;
  maxDate?: Date;
  isEndDate?: boolean,
  label?: string
  showLegend?: boolean,
};

function SummaryModalDatePicker(props: SummaryModalDatePickerProps) {
  const {
    primaryDate,
    text,
    modalStatus,
    onDateChange,
    showTimePicker = false,
    minDate,
    status,
    isEndDate,
    label,
    maxDate,
    showLegend,
  } = props;
  function handleTimePicker(date: any) {
    const dateWithTimeUpdate = new Date(primaryDate);
    dateWithTimeUpdate.setHours(date?.getHours());
    dateWithTimeUpdate.setMinutes(date?.getMinutes());
    dateWithTimeUpdate.setSeconds(date?.getSeconds());
    onDateChange(dateWithTimeUpdate);
  }
  const isDueDateArriving: boolean = !!(
    isEndDate
    && status !== TASK_STATUS.Completed
    && differenceInDays(
      (new Date(primaryDate)),
      (new Date()),
    ) < 1);
  return (
    <>
      <div className="calender_section">
        {modalStatus === TASK_SUMMARY_MODAL_STATUS.SUMMARY ? (
          <><img src={ImageLinks.greenCalender} alt="calendar" />
            <p className="end_date_text">
              {getTranslatedDateTimeValue(
                primaryDate,
                'dd MMM',
              )}
            </p>
          </>
        ) : (
          <div className="date_time_picker_container">
            {label && (modalStatus === TASK_SUMMARY_MODAL_STATUS.EDIT || modalStatus === TASK_SUMMARY_MODAL_STATUS.CREATE) && (
              <div>
                <p className='date_time_picker_container__label'>{label}</p>
              </div>
            )}
            <LocalizationProvider dateAdapter={AdapterDateFns} localeText={DateLocale}>
              <DatePicker
                format="MM/dd/yyyy"
                minDate={minDate}
                maxDate={maxDate}
                value={primaryDate}
                onChange={onDateChange}
                sx={styles.datePicker}
              />
            </LocalizationProvider>
            {showTimePicker && (
              <LocalizationProvider dateAdapter={AdapterDateFns} localeText={DateLocale}>
                <TimePicker
                  value={primaryDate}
                  onChange={handleTimePicker}
                  sx={styles.timePicker}
                />
              </LocalizationProvider>
            )}
          </div>
        )}
      </div>
      {modalStatus === TASK_SUMMARY_MODAL_STATUS.SUMMARY && (
        <>
          <p className="create_date">{text} </p>
          <p className={`time_passed ${isDueDateArriving ? 'alert_end_date' : ''}`}>
            {showLegend ? 'Due by ' : ''}
            {getTranslatedDateTimeValue(primaryDate, 'eee dd')} of {' '}
            {getTranslatedDateTimeValue(primaryDate, 'MMM')}
          </p>
        </>
      )}
    </>
  );
}

export default SummaryModalDatePicker;
