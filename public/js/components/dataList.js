define(function (require)
{
	var preloader = require('./preloader');
	var dateHelper = require('../helpers/date');
	var orangeAPI = require('../helpers/orangeAPI');
	var stringHelper = require('../helpers/string');

	var component = React.createClass({

		loading: true,

		dateChange: function(sender)
		{
			var date = new Date(sender.target.value);

			if (sender.target.value == dateHelper.getDateString(date))
			{
				this.state.date = date;

				this.updateData(this.state.deviceEUI);
			}
		},

		exportClick: function()
		{
			var separator = ";";
			var csvText = "";

			csvText = "data:text/csv;charset=utf-8,";
			csvText += "Num" + separator + "fcnt" + separator + "Date et heure" + separator + "Valeur\n";

			for(var i = 0 ; i < this.state.dataList.length ; i++)
			{
				csvText += (this.state.dataList.length - i).toString() + separator;
				csvText += this.state.dataList[i].value.fcnt.toString() + separator;
				csvText += this.state.dataList[i].timestamp.toLocaleString().replace("à", "") + separator;
				csvText += stringHelper.fromHexa(this.state.dataList[i].value.payload) + separator;
				csvText += "\n";
			}

			var encodedUri = encodeURI(csvText);
			var link = document.createElement("a");

			link.setAttribute("display", "none");
			link.setAttribute("href", encodedUri);
			link.setAttribute("download", this.state.deviceEUI + "_" + dateHelper.getDateString(this.state.date) + ".csv");

			document.body.appendChild(link);

			link.click();

			document.body.removeChild(link);
		},

		updateData: function(deviceEUI)
		{
			var comp = this;

			comp.loading = true;

			orangeAPI.getDataList(deviceEUI, dateHelper.getStartDateString(this.state.date), dateHelper.getEndDateString(this.state.date), function(responseText)
			{
				var response = JSON.parse(responseText);

				comp.loading = false;

				comp.setState({ deviceEUI:deviceEUI, dataList: response });
			});
		},

		getInitialState: function()
		{
			return { date: new Date(), deviceEUI: this.props.device.devEUI, dataList: [] };
		},

		componentWillMount: function()
		{
			if (this.props.componentLoaded != null)
			{
				this.props.componentLoaded(this);
			}

			this.updateData(this.state.deviceEUI);
		},

		render: function ()
		{
			var comp = this;

			if (this.loading)
			{
				return React.createElement("div", { className:"col-100 tablet-66", style:{height:"100%"} },
					React.createElement("div", null,
						React.createElement("br"),
						"Filtre date : ",
						React.createElement("input", {id:"datetimepicker", type:"date", value: dateHelper.getDateString( this.state.date ), /*onChange: this.dateChange*/ }),
						React.createElement("button", { onClick: this.exportClick, style :{ marginLeft:"15px"}}, "Télécharger le CSV")
					),
					React.createElement("br"),
					React.createElement(preloader.component)
				);
			}
			else
			{
				return React.createElement("div", { className:"col-100 tablet-66", style:{height:"100%"}},
					React.createElement("div", null,
						React.createElement("br"),
						"Filtre date : ",
						React.createElement("input", {id:"datetimepicker", type:"date", value: dateHelper.getDateString( this.state.date ), onChange: this.dateChange }),
						React.createElement("button", { onClick: this.exportClick, style :{ marginLeft:"15px"}}, "Télécharger le CSV")
					),
					React.createElement("br"),
					React.createElement("div", {style:{height:"100%"}},
						React.createElement("table", null,
							React.createElement("tr", null,
								React.createElement("th", null, "#"),
								React.createElement("th", null, "fcnt"),
								React.createElement("th", null, "Date et heure"),
								React.createElement("th", null, "Valeur"),
								React.createElement("th", null, "Niveau"),
								React.createElement("th", null, "RSSI"),
								React.createElement("th", null, "SF"),
								React.createElement("th", null, "SNR")
							),

							this.state.dataList.map(function (data, index)
							{
								var backColor = "#FFFFFF";

								if (index % 2 == 0)
								{
									var backColor = "#CCDDFF";
								}

								return React.createElement("tr", {style : { background: backColor}},
									React.createElement("td",{ style :{ padding:"0 15px 0 15px"}}, comp.state.dataList.length - index ),
									React.createElement("td",{ style :{ padding:"0 15px 0 15px"}}, data.metadata.network.lora.fcnt ),
									React.createElement("td",{ style :{ padding:"0 15px 0 15px"}}, new Date(data.timestamp).toLocaleString()),
									React.createElement("td", { style :{ padding:"0 15px 0 15px"}}, stringHelper.fromHexa(data.value.payload)),
									React.createElement("td", { style :{ padding:"0 15px 0 15px"}}, data.metadata.network.lora.signalLevel),
									React.createElement("td", { style :{ padding:"0 15px 0 15px"}}, data.metadata.network.lora.rssi),
									React.createElement("td", { style :{ padding:"0 15px 0 15px"}}, data.metadata.network.lora.sf),
									React.createElement("td", { style :{ padding:"0 15px 0 15px"}}, data.metadata.network.lora.snr)
								)
							})
						)
					)
				);
			}
		}
	});

	return {
		component: component
	};
});
