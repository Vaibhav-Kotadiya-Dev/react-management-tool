import { format } from 'date-fns';

export function getTranslatedDateTimeValue(
  date = new Date() as any,
  formatPattern: string,
) {
  return format(new Date(date), formatPattern);
}