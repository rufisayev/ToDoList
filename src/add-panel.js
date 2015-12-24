var React = require('react');
var ListPanel = require('./list-panel');

var AddPanel = React.createClass({

    getInitialState: function () {
        return {
            inputText: ''
        }
    },
    render: function () {
        return <div className="input-group">
            <input
                type="text"
                className="form-control"
                value={this.state.inputText}
                onChange={this.handleInputTextCharChange}
            />
            <span className="input-group-btn">
                <button
                    type="button"
                    className="btn btn-default"
                    onClick={this.handleSubmitClick}
                >
                    Add
                </button>
                </span>
        </div>
    },
    handleInputTextCharChange: function (event) {
        this.setState({
            inputText: event.target.value
        })
    },
    handleSubmitClick: function (event) {
        console.log(this.state)
        this.props.itemStore.push({
            text: this.state.inputText,
            isFinished: false
        });
        this.setState({inputText: ''})
    }
});

module.exports = AddPanel;