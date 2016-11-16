define(function (require)
{
	var orangeAPI = require('helpers/orangeAPI');
	var indexView = require('views/indexView');

	﻿orangeAPI.getDeviceList(function(responseText)
	{
		var deviceList = JSON.parse(responseText).data;

		ReactDOM.render(React.createElement(indexView, {deviceList: deviceList }), document.getElementById("content"));
	});
});
