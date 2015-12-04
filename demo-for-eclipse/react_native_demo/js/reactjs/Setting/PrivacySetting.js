/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 */
'use strict';

var React = require('React');
	
var SwitchWeibo = require('SwitchWeibo');
var Text = require('Text');
var StyleSheet = require('StyleSheet');
var PageBlock = require('PageBlock');
var PageView = require('PageView');
var View = require('View');
var TouchableHighlight = require('TouchableHighlight');
var SwitchItem = require('SwitchItem');
var WeiboPrivacyAndroid = require('WeiboPrivacyAndroid');

var PrivacySettingPage = React.createClass({
	
	 propTypes: { 
		 result:React.PropTypes.object,
	 },	 
	
	getDefaultProps: function() {
	    /*console.log('getDefaultProps');*/
	 },

  getInitialState : function() {
	  /*console.log('getInitialState');*/
    return {
      trueSwitchIsOn: true,
      falseSwitchIsOn: false,
      colorTrueSwitchIsOn: true,
    };
  },
  
  componentWillMount:function(){
	  /*console.log('componentWillMount');*/
  },

  render: function() {
	console.log('render');
	if(this.props.result){
		console.log(WeiboPrivacyAndroid.Tag,'PrivacySettingPage',this.props.result.privacy.comment,this.props.result.privacy.mobile,this.props.result.privacy.bindstatus,
				this.props.result.mention.mention,this.props.result.mention.contact_list,this.props.result.mention.pic_cmt_in);
	}
    return (
      <PageView title="隐私设置">
        <PageBlock title="通讯录">
        	<SwitchItem title="允许给我推荐通讯录好友">
	          <SwitchWeibo
	            onValueChange={(value) => this.setState({trueSwitchIsOn: value})}
	            value={this.state.trueSwitchIsOn} />
	        </SwitchItem>
	        
	        <SwitchItem title="允许通过此手机号搜到我">
	          <SwitchWeibo
	            onValueChange={(value) => this.setState({falseSwitchIsOn: value})}
	            value={this.state.falseSwitchIsOn} />
	        </SwitchItem>
          </PageBlock>
        <PageBlock title="哪些人可以评论我的微博" description='关闭后，你的通讯录好友将不能通过通讯录找到你'>
	        <TouchableHighlight>
		        <View>
			        <SwitchItem title="所有人"/>
		        </View>
		    </TouchableHighlight>
		    <TouchableHighlight>
		    	<View>
		    		<SwitchItem title="我关注的人"/>
		    	</View>
		    </TouchableHighlight>
		    <TouchableHighlight>
		    	<View>
		    		<SwitchItem title="我的粉丝"/>
		    	</View>
		    </TouchableHighlight>
        </PageBlock>
        <PageBlock title="">
	        <SwitchItem title="允许评论带图">
		        <SwitchWeibo
		          onValueChange={(value) => this.setState({colorTrueSwitchIsOn: value})}
		          value={this.state.colorTrueSwitchIsOn} />
	        </SwitchItem>
        </PageBlock>
        
        <PageBlock title="我可以收到哪些人的@提醒" description='关闭后，其他人将不能在你的微博下发布带图片的评论'>
	        <TouchableHighlight onPress={this.handleUpdateState}>
		        <View>
			        <SwitchItem title="所有人"/>
		        </View>
	        </TouchableHighlight>
	        <TouchableHighlight>
	        	<View>
		    		<SwitchItem title="我关注的人"/>
		    	</View>
	        </TouchableHighlight>
        </PageBlock>
        
      </PageView>
    );
  },
  handleUpdateState:function(){
	  console.log('handle update');
	  WeiboPrivacyAndroid.updateState('http://api.weibo.cn/2/setting/setprivacy','comment',3);
  },
  componentWillUpdate:function(){
	    console.log('componentWillUpdate');
  },
  componentWillUnmount:function(){
	  console.log('componentWillUnmount');
  },
});

module.exports = PrivacySettingPage;
