import moment from 'moment';

export const APP_TIME_OFFSET = 3;

export const getMomentFromStringByFormat = (date, format) =>
	date ? moment(date, format).utcOffset(APP_TIME_OFFSET) : null;

export const getMomentWithOffset = (date) =>
	moment(date).utcOffset(APP_TIME_OFFSET);

export const getMomentWithOffsetTruncateDay = (date) =>
	getMomentWithOffset(date)
		.hours(0)
		.minutes(0)
		.seconds(0)
		.milliseconds(0)
		.format();

export const toFormat = (dateString, format) => {
	if (!dateString) {
		return '';
	}
	const mom = moment(dateString);
	return mom.isValid() ? mom.format(format) : dateString;
};

export const toDDMMYYYYdot = (dateString) => toFormat(dateString, 'DD.MM.YYYY');

export const toDDMMYYYYdotAltDashDash = (dateString) =>
	toDDMMYYYYdot(dateString) || '--';

export const toDDMMYYYYHHMMSS = (dateString) =>
	toFormat(dateString, 'DD.MM.YYYY HH:mm:ss') || '--';

export const toDDMMYYYYdash = (dateString) =>
	toFormat(dateString, 'DD-MM-YYYY');

export const getISO = (date) =>
	moment(date).utcOffset(APP_TIME_OFFSET).toISOString();
