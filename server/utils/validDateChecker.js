export const isValidDate = (year, month) => {
	const currentYear = new Date().getFullYear();
	const currentMonth = new Date().getMonth() + 1; // Adding 1 because months are zero-based

	return year < currentYear || (year == currentYear && month <= currentMonth);
};
