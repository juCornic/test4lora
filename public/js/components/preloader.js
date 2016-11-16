define(function (require)
{

    var component = React.createClass({

        render : function()
        {
            return React.createElement("span", { className: "preloader preloader-blue"},
                        React.createElement("span", { className: "preloader-inner" },
                            React.createElement("span", { className: "preloader-inner-gap" }),
                            React.createElement("span", { className: "preloader-inner-left" },
                                React.createElement("span", { className: "preloader-inner-half-circle" })
                            ),
                            React.createElement("span", { className: "preloader-inner-right" },
                                React.createElement("span", { className: "preloader-inner-half-circle" })
                            )
                        )
                    );
        }
    });

    return{
        component: component
    };
});
