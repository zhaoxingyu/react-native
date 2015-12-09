'use strict';
var React = require('react-native');
var {
	AppRegistry,
	StyleSheet,
	Text,
	Image,
	View,
} = React;

var PrivacySettingPage = require('./PrivacySetting');
var WeiboPrivacyAndroid = require('WeiboPrivacyAndroid');

var PrivacySetting = React.createClass({
	getInitialState : function() {
	    return {	     
	      result:null,
	    };
	  },
	  
	componentWillMount:function(){
		console.log(WeiboPrivacyAndroid.Tag,'index componentWillMount');
		WeiboPrivacyAndroid.getStates((result) => {
			console.log(WeiboPrivacyAndroid.Tag,'index request states result:',result);
			this.setState({
				result:JSON.parse(result),
			});
		});		
	},
  render: function() {
    return (
    	<PrivacySettingPage result={this.state.result}/>
   );
 }
});

AppRegistry.registerComponent('PrivacySetting', () => PrivacySetting);
module.exports = PrivacySetting;