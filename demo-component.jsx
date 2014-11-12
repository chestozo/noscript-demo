/** @jsx React.DOM */
/*jshint trailing: false, newcap: false, laxbreak: true */

var DemoComponent = React.createClass({
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
            <div className="js-react">
                Click count: { this.state.count }
                <br/>
                <input type="button" value="Add" onClick={ this.increment }/>
            </div>
        );
    }
});
