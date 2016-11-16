define(function (require)
{
    var header = require('../components/header');
    var deviceList = require('../components/deviceList');
    var dataList = require('../components/dataList');

    var view = React.createClass({

        selectedDate: new Date(),

        dataListComponent: null,

        onResize: function()
        {
            this.forceUpdate();
        },

        dataListLoaded: function(component)
        {
            this.dataListComponent = component;
        },

        deviceChange: function(selectedEUI)
        {
            this.dataListComponent.setState({ dataList: [] });

            this.dataListComponent.updateData(selectedEUI);
        },

        getInitialState: function()
        {
            return { deviceIndex: 0};
        },

        render: function ()
        {
            var headerHeight = 40;
            var height = (window.innerHeight - headerHeight).toString() + "px";

            window.onresize = this.onResize;

            return React.createElement("div", {style:{height:"100%"}},
                React.createElement(header.component, { text: "Test Lora" }),
                React.createElement("div", {className:"row", style:{height:height, overflow:"scroll"}},
                    React.createElement(deviceList.component, { deviceList: this.props.deviceList , onSelectedChange: this.deviceChange }),
                    React.createElement(dataList.component, { componentLoaded: this.dataListLoaded, device: this.props.deviceList[0] })
                )
            );
        }
    });

    return view;
});
