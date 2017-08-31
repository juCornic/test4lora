define(function (require)
{

    var component = React.createClass({

        currentIndex:0,

        deviceClick: function(sender)
        {
            var selectedEUI = sender.target.innerText.split(" | ")[1];

            for(var i = 0 ; i < this.props.deviceList.length; i++)
            {
                if (this.props.deviceList[i].devEUI == selectedEUI)
                {
                    if (this.currentIndex != i)
                    {
                        this.currentIndex = i;
                        this.forceUpdate();
                    }

                    break;
                }
            }

            this.props.onSelectedChange(selectedEUI);
        },

        render: function()
        {
            var comp = this;

            return React.createElement("div", { className:"col-100 tablet-33", style: { background: "#E5E5E5" }},

                this.props.deviceList.map(function (device, index)
                {
                    if (comp.currentIndex == index)
                    {
                        return React.createElement("ul", {style:{background:"#2196F3", listStyle: "none"}},
                            React.createElement("li", { onClick: comp.deviceClick },
                                React.createElement("a", { href:"#", style:{color:"#ffffff"}}, device.name + " | " + device.devEUI)
                            )
                        );
                    }
                    else
                    {
                        return React.createElement("ul", {style:{listStyle: "none"}},
                            React.createElement("li", { onClick: comp.deviceClick },
                                React.createElement("a", { href:"#"}, device.name + " | " + device.devEUI)
                            )
                        );
                    }
                })
            )
        }
    });

    return {
        component: component
    };
});
