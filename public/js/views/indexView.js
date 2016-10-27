
    var indexView = React.createClass({
	
		deviceList: [],
	
		deviceClick: function(sender)
		{
			var selectedEUI = sender.target.innerText.split(" - ")[1];
			
			for(var i = 0 ; i < this.deviceList.length ; i++)
			{
				if (this.deviceList[i].devEUI == selectedEUI)
				{
					this.setState({deviceIndex: i});
					break;
				}
			}
		},
	
		getInitialState: function()
		{
			return { deviceIndex: 0};
		},
	
        render: function ()
        {
			var height = (document.body.clientHeight).toString() + "px";
            var width = "300px"; 
			var view = this;
			var req = new XMLHttpRequest();
			
            req.onload = reqListener;
            req.open('get', 'https://liveobjects.orange-business.com/api/v0/vendors/lora/devices?status=ACTIVATED&sort=name', false);
			req.setRequestHeader("X-API-Key", "310def0e53f04c0b814fa8f3c05124fb");
            req.send();

            function reqListener(e)
            {
                view.deviceList = JSON.parse(this.responseText).data;
            }
			
            return React.createElement("div", null,
                React.createElement(header, { text: "Test Lora" }),
				React.createElement(deviceList, { device: this.deviceList[this.state.deviceIndex] }),
					React.createElement("div", { style: { height: height, width: width, background: "#EEEEEE" }},

						React.createElement("br", null, null),
						
						this.deviceList.map(function (device)
                                  {
									  return React.createElement("ul", null,
										React.createElement("li", { onClick: view.deviceClick }, 
											React.createElement("a", { href:"#"}, device.name + " - " + device.devEUI)
										)
									  );
									  
								  })
					)
            );
        }
    });