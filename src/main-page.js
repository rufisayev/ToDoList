var React = require('react');
var AddPanel = require('./add-panel');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var fireBaseUrl = 'https://todolistprject.firebaseio.com/';
var ListPanel = require('./list-panel');
var update = require('react-addons-update');
var _ = require('underscore');

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
                    <button
                        type="button"
                        onClick={this.handleSelectedClick}
                        className="btn btn-default">
                        Selected
                    </button>
                    <button
                        type="button"
                        onClick={this.handleUnSelectedClick}
                        className="btn btn-default">
                        UnSelected
                    </button>
                </div>
            </div>
        </div>
    },

    mixins: [ReactFire],

    getInitialState: function () {
        return {
            toDoList: {},
            dataLoaded: false,
            stateChanged: false,
            dummyData: []
        }
    },

    componentWillMount: function () {
        this.fireBase = new FireBase(fireBaseUrl + 'toDoList');
        this.bindAsObject(this.fireBase, 'toDoList');
        this.fireBase.on('value', this.handleToDoListLoaded);
    },
    componentDidMount: function () {
        console.log('todo', this.state.toDoList)
    },
    handleSelectedClick: function (event) {
        if (this.state.stateChanged === false) {
            console.log(1)
            this.setState({stateChanged: true, dummyData: this.state.toDoList})
        } else {
            this.setState({toDoList: this.state.dummyData});
        }

        var result = _.filter(this.state.toDoList, function (item) {
            return item.isFinished === true;
        });
        this.setState({toDoList: result})
    },
    handleUnSelectedClick: function (event) {
        if (this.state.stateChanged === false) {
            this.setState({stateChanged: true, dummyData: this.state.toDoList})
        } else {
            console.log('dummy', this.state.dummyData)
            console.log('before', this.state.toDoList);
            this.setState({toDoList: this.state.dummyData});
        }

        console.log('after', this.state.toDoList);
        var result = _.filter(this.state.toDoList, function (item) {
            return item.isFinished === false;
        });
        this.setState({toDoList: result});
    },

    handleDeleteAllClick: function (event) {
        for (var key in this.state.toDoList) {
            if (this.state.toDoList[key].isFinished === true) {
                this.fireBase.child(key).remove();
            }
        }
    },

    handleToDoListLoaded: function () {
        this.setState({dataLoaded: true});
    }
});

module.exports = MainPage;