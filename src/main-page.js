var React = require('react');
var AddPanel = require('./add-panel');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var fireBaseUrl = 'https://todolistprject.firebaseio.com/';
var ListPanel = require('./list-panel');

var MainPage = React.createClass({

    render: function () {
        return <div className="row panel panel-default">
            <div className="col-md-8 col-md-offset-2">
                <h2 className="text-center">
                    Your to do list
                </h2>
            </div>
            <AddPanel itemStore={this.firebaseRefs.toDoList}/>
            <hr/>
            <div >
                <ListPanel items={this.state.toDoList}/>
                <div className="text center clear-complete">
                    <hr/>
                    <button
                        type="button"
                        onClick={this.handleDeleteAllClick}
                        className="btn btn-default">
                        Delete all
                    </button>
                </div>
            </div>
        </div>
    },

    mixins: [ReactFire],

    getInitialState: function () {
        return {
            toDoList: {},
            dataLoaded: false
        }
    },
    componentWillMount: function () {
        this.fireBase = new FireBase(fireBaseUrl + 'toDoList');
        this.bindAsObject(this.fireBase, 'toDoList');
        this.fireBase.on('value', this.handleToDoListLoaded);
    },
    handleDeleteAllClick:function(event){
        for(var key in this.state.toDoList){
            if(this.state.toDoList[key].isFinished === true){
                this.fireBase.child(key).remove();
            }
        }
    },
    handleToDoListLoaded: function () {
        this.setState({dataLoaded: true});
    }
});

module.exports = MainPage;