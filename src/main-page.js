var React = require('react');
var AddPanel = require('./add-panel');
var ReactFire = require('reactfire');
var FireBase = require('firebase');
var fireBaseUrl = 'https://todolistprject.firebaseio.com/';
var ListPanel = require('./list-panel');
var update = require('react-addons-update');
var _ = require('lodash');


var FilterType = {
    ALL: 'ALL',
    SELECTED: 'SELECTED',
    UNSELECTED: 'UNSELECTED'
};

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
                <ListPanel items={this.filterTodos(this.state.filterType)}/>
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
                    <button
                        type="button"
                        onClick={this.handleAllItemsClick}
                        className="btn btn-default">
                        All
                    </button>
                </div>
            </div>
        </div>
    },

    mixins: [ReactFire],

    getInitialState: function () {
        return {
            toDoList: [],
            dataLoaded: false,
            filterType: FilterType.ALL
        }
    },

    componentWillMount: function () {
        this.fireBase = new FireBase(fireBaseUrl + 'toDoList');
        //this.bindAsObject(this.fireBase, 'toDoList');
        this.fireBase.on('value', this.handleToDoListLoaded);
    },
    handleSelectedClick: function () {
        this.setState({ filterType: FilterType.SELECTED });
        console.log('###', this.state);
    },
    handleUnSelectedClick: function () {
        this.setState({ filterType: FilterType.UNSELECTED});
        console.log('###', this.state);
    },

    handleDeleteAllClick: function (event) {

        for (var key in this.state.toDoList) {
            if (this.state.toDoList[key].isFinished === true) {
                this.fireBase.child(key).remove();
            }
        }
    },
    handleAllItemsClick:function(){
        this.setState({ filterType: FilterType.ALL});
    },

    filterTodos: function(filterType) {
        console.log('#### FILTERING TODOS', this.state);
        switch (filterType) {
            case FilterType.ALL:
                return this.state.toDoList;
            case FilterType.SELECTED:
                return _.filter(this.state.toDoList, function(todo) {
                    return todo.isFinished;
                });
            case FilterType.UNSELECTED:
                return _.filter(this.state.toDoList, function(todo) {
                    return !todo.isFinished;
                });
            default:
                return this.state.toDoList;
        }
    },

    handleToDoListLoaded: function (data) {
        var toDoList = data.val();
        this.setState({toDoList: toDoList, dataLoaded: true});
    }
});

module.exports = MainPage;