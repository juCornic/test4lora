define(function (require)
{

    var component = React.createClass({

        render: function render()
        {
            return React.createElement("div", { className: "row navbar", style: {height:"40px"} },
                React.createElement("div", { className: "col-100 navbar-inner" },
                    React.createElement("div", { className: "left" }),
                    React.createElement("div", { className: "center" }, this.props.text),
                    React.createElement("div", { className: "right" })
                )
            );
        }
    });

    return {
        component: component
    };
});
