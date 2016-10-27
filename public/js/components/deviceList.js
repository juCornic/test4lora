
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
	
		exportClick: function()
		{
			var separator = ";";
			var csvText = "";			
			
			csvText = "data:text/csv;charset=utf-8,";
			csvText += "#" + separator + "fcnt" + separator + "Date et heure" + separator + "Valeur\n";
			
			for(var i = 0 ; i < dataList[0].length ; i++)
			{
				csvText += (dataList[0].length - i).toString() + separator;
				csvText += dataList[0][i].value.fcnt.toString() + separator;
				csvText += getLocalDateString(dataList[0][i].timestamp).replace("à", "") + separator;
				csvText += decodeHexa(dataList[0][i].value.payload) + separator;
				csvText += "\n";
			}
			
			var encodedUri = encodeURI(csvText);
			var href = document.getElementById("exportCSV");
			
			href.setAttribute("href", encodedUri);
			href.setAttribute("download", "export.csv");
			
			href.click();
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
            }
		
			return React.createElement("div", { style: { height:"100%", position: "absolute", left:"310px"}},
						React.createElement("div", null, 							
							React.createElement("h4", null, this.props.device.name + " - " + this.props.device.devEUI),							
							"Filtre date : ",							
							React.createElement("input", {type:"date", value: getDateString( this.state.date ), onChange: this.dateChange }),
							React.createElement("button", { onClick: this.exportClick, style :{ marginLeft:"15px"}}, "Télécharger le CSV"),
							React.createElement("a", { id:"exportCSV" , style :{ display:"none"}})
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