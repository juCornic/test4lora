define(function (require)
{
	var apiWebSite = "https://liveobjects.orange-business.com/api/v0/";
	var apiKey = "7ffdc24c672c4916a3268b06d402896b";

	function getDeviceList(callback)
	{
		var req = new XMLHttpRequest();

	    req.onload = listener;
	    req.open('get', apiWebSite + 'vendors/lora/devices?status=ACTIVATED&sort=name', true);
		req.setRequestHeader("X-API-Key", apiKey );
	    req.send();

		function listener(e)
		{
			requestInProgress = false;

			callback(this.responseText);
		}
	}

	function getDataList(deviceEUI, isoStartDate, isoEndDate, callback)
	{
		var req = new XMLHttpRequest();

        req.onload = listener;
        req.open('get', apiWebSite + 'data/streams/urn:lora:' + deviceEUI  + '!uplink?limit=1000&timeRange=' + isoStartDate + "," + isoEndDate, true);
		req.setRequestHeader("X-API-Key", apiKey);
        req.send();

		function listener(e)
		{
			callback(this.responseText);
		}
	}

	return {
		getDeviceList: getDeviceList,
		getDataList: getDataList
	};
});
