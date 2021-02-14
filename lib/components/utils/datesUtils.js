import moment from 'moment';

export var APP_TIME_OFFSET = 3;

export var getMomentFromStringByFormat = function getMomentFromStringByFormat(date, format) {
	return date ? moment(date, format).utcOffset(APP_TIME_OFFSET) : null;
};

// export const getMomentWithOffset = (date) =>
// 	moment(date).utcOffset(APP_TIME_OFFSET);
export var getMomentWithOffset = function getMomentWithOffset(date) {
	return moment(date).format();
};

export var getMomentWithOffsetTruncateDay = function getMomentWithOffsetTruncateDay(date) {
	return moment(date).startOf('day')
	// .hours(0)
	// .minutes(0)
	// .seconds(0)
	// .milliseconds(0)
	.format();
};

export var toFormat = function toFormat(dateString, format) {
	if (!dateString) {
		return '';
	}
	var mom = moment(dateString);
	return mom.isValid() ? mom.format(format) : dateString;
};

export var toDDMMYYYYdot = function toDDMMYYYYdot(dateString) {
	return toFormat(dateString, 'DD.MM.YYYY');
};

export var toDDMMYYYYdotAltDashDash = function toDDMMYYYYdotAltDashDash(dateString) {
	return toDDMMYYYYdot(dateString) || '--';
};

export var toDDMMYYYYHHMMSS = function toDDMMYYYYHHMMSS(dateString) {
	return toFormat(dateString, 'DD.MM.YYYY HH:mm:ss') || '--';
};

export var toDDMMYYYYdash = function toDDMMYYYYdash(dateString) {
	return toFormat(dateString, 'DD-MM-YYYY');
};

export var getISO = function getISO(date) {
	return moment(date).utcOffset(APP_TIME_OFFSET).toISOString();
};