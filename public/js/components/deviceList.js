﻿
	var dataList = [];
	var deviceId = null;
	
	function decodeHexa(hexValue)
	{
		var str = '';
		for (var i = 0; i < hexValue.length; i += 2)
			str += String.fromCharCode(parseInt(hexValue.substr(i, 2), 16));
		return str;
	}
	
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
	
	function getLocalDateString(date)
	{
		var date = new Date(date);
		
		return date.toLocaleString();
	}
	
    var deviceList = React.createClass({
	
		dateChange: function(sender)
		{
			this.setState({ date : new Date(sender.target.value)});
		},
	
		getInitialState: function()
		{
			return { date: new Date(), pageId : 0};
		},
	
        render: function ()
        {				
			dataList = [];
			deviceId = this.props.device.devEUI;	
		
			var req = new XMLHttpRequest();
            req.onload = reqListener;
            req.open('get', 'https://liveobjects.orange-business.com/api/v0/data/streams/urn:lora:' + deviceId  + '!uplink?limit=1000&timeRange=' + getStartDateString(this.state.date) + "," + getEndDateString(this.state.date), false);
			req.setRequestHeader("X-API-Key", "310def0e53f04c0b814fa8f3c05124fb");
            req.send();

            function reqListener(e)
            {
				var datas = JSON.parse(this.responseText);
				
                dataList.push(datas);
				
				/*
				if (datas.length == 100)
				{
					req.open('get', 'https://liveobjects.orange-business.com/api/v0/data/streams/urn:lora:' + deviceId + '!uplink?timeRange=' + getStartDateString(date) + "," + getEndDateString(date) + '&bookmarkId=' + datas[datas.length - 1].id , false);
					req.setRequestHeader("X-API-Key", "310def0e53f04c0b814fa8f3c05124fb");
					req.send();
				}*/
            }
		
			return React.createElement("div", { style: { height:"100%", position: "absolute", left:"310px"}},
						React.createElement("div", null, 
							React.createElement("h4", null, this.props.device.name + " - " + this.props.device.devEUI),
							"Filtre date : ",							
							React.createElement("input", {type:"date", value: getDateString( this.state.date ), onChange: this.dateChange })/*,						
							React.createElement("button", null, "Exporter en CSV")*/
						),
						React.createElement("br"),
						React.createElement("div", { style: { height:"75%", overflow:"auto" } },
							React.createElement("table", null , 

								React.createElement("tr", null,
									React.createElement("th", null, "#"),
									React.createElement("th", null, "fcnt"),
									React.createElement("th", null, "Date et heure"),
									React.createElement("th", null, "Valeur")
								),
								
								dataList[0].map(function (data, index)
								{
									var backColor = "#FFFFFF";
									
									if (index % 2 == 0)
									{
										var backColor = "#CCDDFF";
									}
									
									return React.createElement("tr", {style : { background: backColor}},
										React.createElement("td",{ style :{ padding:"0 15px 0 15px"}}, dataList[0].length - index ),
										React.createElement("td",{ style :{ padding:"0 15px 0 15px"}}, data.value.fcnt ),
										React.createElement("td",{ style :{ padding:"0 15px 0 15px"}}, getLocalDateString(data.timestamp)),
										React.createElement("td", { style :{ padding:"0 15px 0 15px"}}, decodeHexa(data.value.payload))
									)
								})
							)
						)
					);
			
        }
    });