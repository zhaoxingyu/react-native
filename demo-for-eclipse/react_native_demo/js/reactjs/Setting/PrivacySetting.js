/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 */
'use strict';

var React = require('React');
	
var SwitchWeibo = require('SwitchWeibo');
var Text = require('Text');
var Image = require('Image');
var StyleSheet = require('StyleSheet');
var PageBlock = require('PageBlock');
var PageView = require('PageView');
var View = require('View');
var TouchableHighlight = require('TouchableHighlight');
var SwitchItem = require('SwitchItem');
var WeiboPrivacyAndroid = require('WeiboPrivacyAndroid');

var checked = require('image!common_checkbox_checked');
var unchecked = require('image!common_checkbox_unchecked');

var PrivacySettingPage = React.createClass({	
  propTypes: { 
	  result:React.PropTypes.object,
  },	 	

  getInitialState : function() {
    return {
      mobileSwitchIsOn: true,
      contactListSwitchIsOn: false,
      picCmtSwitchIsOn: true,
      currentCommentId:0,
      currentMentionId:0,
      lastCommentId:0,
      lastMentionId:0,
      data:null,
    };
  },
  
  componentWillReceiveProps:function(nextProps){
	  if(nextProps.result){
		  console.log('componentWillReceiveProps: ' + nextProps.result);
		  this.setState({
			  mobileSwitchIsOn:nextProps.result.privacy.mobile===1,
			  contactListSwitchIsOn:nextProps.result.mention.contact_list===1,
			  picCmtSwitchIsOn:nextProps.result.mention.pic_cmt_in===1,
			  currentCommentId:nextProps.result.privacy.comment,
			  currentMentionId:nextProps.result.mention.mention,
			  lastCommentId:nextProps.result.privacy.comment,
			  lastMentionId:nextProps.result.mention.mention,
		  });
	  }
  },

  render: function() {
	console.log('render');
	console.log('current mention id:' + this.state.currentMentionId);
	console.log('current comment id:' + this.state.currentCommentId);
	var bindstatus;
	if(this.props.result){
		console.log(WeiboPrivacyAndroid.Tag,'PrivacySettingPage',this.props.result.privacy.mobile,this.props.result.mention.contact_list,
				this.props.result.privacy.comment,this.props.result.mention.pic_cmt_in,this.props.result.mention.mention,this.props.result.privacy.bindstatus);
		console.log(WeiboPrivacyAndroid.Tag,'PrivacySettingPage',this.state.mobileSwitchIsOn,this.state.contactListSwitchIsOn,
				this.state.currentCommentId,this.state.picCmtSwitchIsOn,this.state.currentMentionId);
		if(this.props.result.privacy.bindstatus){
			if(this.props.result.privacy.bindstatus == 1){
				bindstatus=
					<PageBlock title="通讯录">
			        	<SwitchItem title="允许给我推荐通讯录好友" mobileSwitchIsOn={this.state.mobileSwitchIsOn}>
				          <SwitchWeibo
				            onValueChange={(value) => {this.setState({contactListSwitchIsOn: value}); this.handleSwitchChange('contact_list',this.state.contactListSwitchIsOn);}}
				            value={this.state.contactListSwitchIsOn} />
				        </SwitchItem>
				        
				        <SwitchItem title="允许通过此手机号搜到我">
				          <SwitchWeibo
				            onValueChange={(value) => {this.setState({mobileSwitchIsOn: value}); this.handleSwitchChange('mobile',this.state.mobileSwitchIsOn);}}
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
        	<TouchableHighlight onPress={()=>{this.setState({currentCommentId: 0});}}>
        		<View>
        			<SwitchItem title="所有人">
        				<Text>{this.state.currentCommentId===0?'checked':''}</Text>
        			</SwitchItem>
        		</View>
	        </TouchableHighlight>
	        <TouchableHighlight onPress={()=>{this.setState({currentCommentId: 1});}}>
    			<View>
    				<SwitchItem title="我关注的人">
        				<Text>{this.state.currentCommentId===1?'checked':''}</Text>
        			</SwitchItem>
    			</View>
	        </TouchableHighlight>
    		<TouchableHighlight onPress={()=>{this.setState({currentCommentId: 3});}}>
    			<View>
    				<SwitchItem title="我的粉丝">
        				<Text>{this.state.currentCommentId===3?'checked':''}</Text>
        			</SwitchItem>
    			</View>
	        </TouchableHighlight>
        </PageBlock>
        <PageBlock title="">
	        <SwitchItem title="允许评论带图">
		        <SwitchWeibo
		          onValueChange={(value) => {this.setState({picCmtSwitchIsOn: value});this.handleSwitchChange('pic_cmt_in',this.state.picCmtSwitchIsOn);}}
		          value={this.state.picCmtSwitchIsOn} />
	        </SwitchItem>
        </PageBlock>
        <PageBlock title="我可以收到哪些人的@提醒" description='关闭后，其他人将不能在你的微博下发布带图片的评论'>
        	<TouchableHighlight onPress={()=>{this.setState({currentMentionId: 0});}}>
        		<View>
        			<SwitchItem title="所有人">
        				<Text>{this.state.currentMentionId===0?'checked':''}</Text>
        			</SwitchItem>
        		</View>
	        </TouchableHighlight>
			<TouchableHighlight onPress={()=>{this.setState({currentMentionId: 1});}}>
				<View>
					<SwitchItem title="我关注的人">
						<Text>{this.state.currentMentionId===1?'checked':''}</Text>
					</SwitchItem>
				</View>
	        </TouchableHighlight>
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

  componentDidUpdate:function(){
	console.log('componentDidUpdate');
	console.log('last mention id:' + this.state.lastMentionId);
	console.log('last comment id:' + this.state.lastCommentId);
	if(this.state.currentMentionId !== this.state.lastMentionId){
		var json = '{mention:'+this.state.currentMentionId+'}';
		WeiboPrivacyAndroid.updateState('http://api.weibo.cn/2/setting/setprivacy',json);
		this.setState({
			lastMentionId:this.state.currentMentionId,
		});
	}
	if(this.state.currentCommentId !== this.state.lastCommentId){
		var json = '{comment:'+this.state.currentCommentId+'}';
		WeiboPrivacyAndroid.updateState('http://api.weibo.cn/2/setting/setprivacy',json);
		this.setState({
			lastCommentId:this.state.currentCommentId,
		});
	}
  },
  
});

module.exports = PrivacySettingPage;
