define(function (require)
{

	function getDateString(date)
	{
		return date.toISOString().split("T")[0];
	}

	function getStartDateString(date)
	{
		var start = date;

		start.setHours(0,0,0,0);

		return start.toISOString();
	}

	function getEndDateString(date)
	{
		var end = date;

		end.setHours(23,59,59,999);

		return end.toISOString();
	}

	return {
		getDateString: getDateString,
		getStartDateString: getStartDateString,
		getEndDateString: getEndDateString
	};
});
