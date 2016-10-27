
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
		/*
		var year = (date.getYear() + 1900).toString();
		var month = (date.getMonth() + 1).toString();
		var day = date.getDate().toString();
		
		if (month.length == 1)
		{
			month = "0" + month;
		}
		
		if (day.length == 1)
		{
			day = "0" + day;
		}		
		
		return year + "-" + month + "-" + day;*/
		
		return date.toISOString().split("T")[0];
	}
	
	function getStartDateString(date)
	{
		/*
		var year = (date.getYear() + 1900).toString();
		var month = (date.getMonth() + 1).toString();
		var day = date.getDate().toString();
		var temp = Date.parse(day + "/" + month + "/" + year);
				
		return temp.toISOString();*/
		
		return getDateString(date) + "T00:00:00.000Z";
	}
	
	function getEndDateString(date)
	{
		return getDateString(date) + "T23:59:59.000Z";
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
			deviceId = this.props.device.devEUI;		
			
			return { date: new Date(), pageId : 0};
		},
	
        render: function ()
        {				
			dataList = [];
		
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
							React.createElement("br"),
							"Filtre date : ",							
							React.createElement("input", {type:"date", value: getDateString( this.state.date ), onChange: this.dateChange })							
						),
						React.createElement("br"),
						React.createElement("div", { style: { height:"75%", overflow:"auto" } },
							React.createElement("table", null , 

								React.createElement("tr", null,
									React.createElement("th", null, "#"),
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
										React.createElement("td",{ style :{ padding:"0 15px 0 15px"}}, getLocalDateString(data.timestamp)),
										React.createElement("td", { style :{ padding:"0 15px 0 15px"}}, decodeHexa(data.value.payload))
									)
								})
							)
						)
					);
			
        }
    });