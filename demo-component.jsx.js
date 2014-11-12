/** @jsx React.DOM */
/*jshint trailing: false, newcap: false, laxbreak: true */

var DemoComponent = React.createClass({displayName: 'DemoComponent',
    getInitialState: function() {
        return {
            count: 0
        };
    },
    increment: function() {
        this.setState({ count: this.state.count + 1 });
    },
    render: function() {
        return (
            React.DOM.div({className: "js-react"}, 
                "Click count: ",  this.state.count, 
                React.DOM.br(null), 
                React.DOM.input({type: "button", value: "Add", onClick:  this.increment})
            )
        );
    }
});
