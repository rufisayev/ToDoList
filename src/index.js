var React = require('react');
var ReactDOM = require('react-dom');
var MainPage = require('./main-page');

var element = React.createElement(MainPage, {});
ReactDOM.render(element, document.querySelector('.container'));
