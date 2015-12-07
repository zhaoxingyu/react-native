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

  getInitialState : function() {
    return {
      mobileSwitchIsOn: true,
      contactListSwitchIsOn: false,
      picCmtSwitchIsOn: true,
      contactId:'contact_list',
      mobileId:'mobile',
      piccmtinId:'pic_cmt_in',
    };
  },

  render: function() {
	console.log('render');
	var bindstatus;
	if(this.props.result){
		console.log(WeiboPrivacyAndroid.Tag,'PrivacySettingPage',this.props.result.privacy.comment,this.props.result.privacy.mobile,this.props.result.privacy.bindstatus,
				this.props.result.mention.mention,this.props.result.mention.contact_list,this.props.result.mention.pic_cmt_in);
		if(this.props.result.privacy.bindstatus){
			if(this.props.result.privacy.bindstatus == 1){
				bindstatus=
					<PageBlock title="通讯录">
			        	<SwitchItem title="允许给我推荐通讯录好友" mobileSwitchIsOn={this.state.mobileSwitchIsOn}>
				          <SwitchWeibo
				            onValueChange={(value) => {this.setState({contactListSwitchIsOn: value}); this.handleSwitchChange(this.state.contactId,this.state.contactListSwitchIsOn);}}
				            value={this.state.contactListSwitchIsOn} />
				        </SwitchItem>
				        
				        <SwitchItem title="允许通过此手机号搜到我">
				          <SwitchWeibo
				            onValueChange={(value) => {this.setState({mobileSwitchIsOn: value}); this.handleSwitchChange(this.state.mobileId,this.state.mobileSwitchIsOn);}}
				            value={this.state.mobileSwitchIsOn} />
				        </SwitchItem>
			        </PageBlock>;
			}
		}
	}
	
    return (
      <PageView title="隐私设置">
        {bindstatus}
        <PageBlock title="哪些人可以评论我的微博" description='关闭后，你的通讯录好友将不能通过通讯录找到你'>
	        <SwitchItem type='comment' id="0" title="所有人"/>
    		<SwitchItem type='comment' id="1" title="我关注的人"/>
    		<SwitchItem type='comment' id="3" title="我的粉丝"/>
        </PageBlock>
        <PageBlock title="">
	        <SwitchItem title="允许评论带图">
		        <SwitchWeibo
		          onValueChange={(value) => {this.setState({picCmtSwitchIsOn: value});this.handleSwitchChange(this.state.piccmtinId,this.state.picCmtSwitchIsOn);}}
		          value={this.state.picCmtSwitchIsOn} />
	        </SwitchItem>
        </PageBlock>
        <PageBlock title="我可以收到哪些人的@提醒" description='关闭后，其他人将不能在你的微博下发布带图片的评论'>
			<SwitchItem type='mention' id="0" title="所有人"/>
		    <SwitchItem type='mention' id="1" title="我关注的人"/>
        </PageBlock>
        
      </PageView>
    );
  },

  handleSwitchChange:function(key,bool){
	  var value;
	  if(bool){
		  value = 1;
	  }else{
		  value = 0;
	  }
	  var json = '{'+key+':'+value+'}';
	  console.log(json);
	  WeiboPrivacyAndroid.updateState('http://api.weibo.cn/2/setting/setprivacy',json); 
  },
});

module.exports = PrivacySettingPage;
