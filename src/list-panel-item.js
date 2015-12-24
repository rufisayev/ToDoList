var React = require('react');
var Firebase = require('firebase');
var fireBaseUrl = 'https://todolistprject.firebaseio.com/';

var ListPanelItem = React.createClass({
    getInitialState: function () {
        return {
            text: this.props.item.text,
            isFinished: this.props.item.isFinished
        }
    },
    componentWillMount: function () {
        this.firebase = new Firebase(fireBaseUrl + 'toDoList/' + this.props.item.key);
    },
    render: function () {
        return <div className="input-group">
            <span className="input-group-addon">
                <input
                    type="checkbox"
                    checked={this.state.isFinished}
                    onChange={this.handleFinishedChange}
                />
            </span>
            <input className="form-control"
                   type="text"
                   value={this.state.text}
            disabled={this.state.isFinished}/>
            <span className="input-group-btn">
            <button
                className="btn btn-default"
                onClick={this.handleDeleteClick}>
                Delete
            </button>
                </span>
        </div>

    },
    handleFinishedChange:function(event){
        var update = {isFinished:event.target.checked};
        this.setState(update);
        this.firebase.update(update);
    },
    handleDeleteClick:function(event){
        this.firebase.remove();
    }
});
module.exports = ListPanelItem;
