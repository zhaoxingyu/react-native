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
var WeiboPrivacyAndroid = require('./WeiboPrivacyAndroid');

var PrivacySetting = React.createClass({
	getInitialState : function() {
	    return {	     
	      result:null,
	    };
	  },
	  
	componentWillMount:function(){
		console.log(WeiboPrivacyAndroid.Tag,'index componentWillMount');
		WeiboPrivacyAndroid.getStates("http://api.weibo.cn/2/setting/getprivacy",(result) => {
			console.log(WeiboPrivacyAndroid.Tag,'index request states result:',result);
			this.setState({
				result:JSON.parse(result),
			});
		});		
	},
  render: function() {
	/*if(this.state.result){
		console.log(WeiboPrivacyAndroid.Tag,this.state.result.privacy.comment,this.state.result.privacy.mobile,this.state.result.privacy.bindstatus,
				this.state.result.mention.mention,this.state.result.mention.contact_list,this.state.result.mention.pic_cmt_in);
	}*/
    return (
    	<PrivacySettingPage result={this.state.result}/>
   );
 }
});

AppRegistry.registerComponent('PrivacySetting', () => PrivacySetting);
module.exports = PrivacySetting;