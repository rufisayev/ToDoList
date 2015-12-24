var React = require('react');
var ListPanelItem = require('./list-panel-item');

var ListPanel = React.createClass({
    render: function () {
        return <div>
            {this.renderList()}
        </div>
    },
    renderList:function(){
        if(!this.props.items){
            return <h5>You have no to do list</h5>
        }else{
            var panelListItems = [];

            for(var key in this.props.items){
                var item = this.props.items[key];
                item.key = key;
                panelListItems.push(
                    <ListPanelItem item={this.props.items[key]} key={key}/>
                )
            }
            return panelListItems;
        }
    }
});
module.exports = ListPanel;
