
    var header = React.createClass({

        render: function render()
        {
            return React.createElement("div", { className: "navbar" },
                React.createElement("div", { className: "navbar-inner" },
                    React.createElement("div", { className: "left" }),
                    React.createElement("div", { className: "center" }, this.props.text),
                    React.createElement("div", { className: "right" })
                )
            );
        }
    });