
	var devList = [];

    var indexView = React.createClass({
	
        render: function ()
        {
			var req = new XMLHttpRequest();
            req.onload = reqListener;
            req.open('get', 'https://liveobjects.orange-business.com/api/v0/vendors/lora/devices?status=ACTIVATED&sort=-name', false);
			req.setRequestHeader("X-API-Key", "310def0e53f04c0b814fa8f3c05124fb");
            req.send();

            function reqListener(e)
            {
                devList = JSON.parse(this.responseText).data;
            }
			
			var height = (document.body.clientHeight).toString() + "px";
            var width = "300px"; 
			
            return React.createElement("div", null,
                React.createElement(header, { text: "Test Lora" }),
				React.createElement(deviceList, { device: devList[0] }),
					React.createElement("div", { style: { height: height, width: width, background: "#EEEEEE" }},

						React.createElement("br", null, null),						
						
						devList.map(function (device)
                                  {
									  return React.createElement("a", { href: "#" }, device.name + " - " + device.devEUI)
									  
								  })
					)
            );
        }
    });