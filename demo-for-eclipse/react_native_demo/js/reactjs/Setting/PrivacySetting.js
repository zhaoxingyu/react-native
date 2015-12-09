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
var first_update = false;

var PrivacySettingPage = React.createClass({	
  propTypes: { 
	  result:React.PropTypes.object,
  },	 	

  getInitialState : function() {
    return {
      mobileSwitchIsOn: true,
      contactListSwitchIsOn: false,
      picCmtSwitchIsOn: true,
      all:0,
      myfollow:1,
      myfans:3,
      currentCommentId:3,
      currentMentionId:0,
      bindstatus:0,
    };
  },
  
  componentWillReceiveProps:function(nextProps){
	  if(nextProps.result){
		  console.log('componentWillReceiveProps: ' + JSON.stringify(nextProps.result));
		  this.setState({
			  mobileSwitchIsOn:nextProps.result.privacy.mobile===1,
			  contactListSwitchIsOn:nextProps.result.mention.contact_list===1,
			  picCmtSwitchIsOn:nextProps.result.mention.pic_cmt_in===1,
			  currentCommentId:nextProps.result.privacy.comment,
			  currentMentionId:nextProps.result.mention.mention,
			  bindstatus:nextProps.result.privacy.bindstatus,
		  });
		  first_update = true;
	  }
  },
  
  shouldComponentUpdate:function(nextProps,nextState){
	  //分析是否继续跟新UI时，需要判断所有变量的更新状态
	  var updateUI = false;  
	  if(first_update){
		  updateUI = true;
		  first_update = false;
	  }
	  //判断comment id 是否有更新
	  if(this.state.currentCommentId !== nextState.currentCommentId){
		  console.log('shouldComponentUpdate comment id: ' + nextState.currentCommentId + " prev id: " + this.state.currentCommentId);
		  var json = '{comment:'+nextState.currentCommentId+'}';
		  WeiboPrivacyAndroid.updateState('http://api.weibo.cn/2/setting/setprivacy',json);
		  updateUI = true;
	  }
	  //判断mention id 是否有更新
	  if(this.state.currentMentionId !== nextState.currentMentionId){
		  console.log('shouldComponentUpdate mention id: ' + nextState.currentMentionId + " prev id: " + this.state.currentMentionId);
		  var json = '{mention:'+nextState.currentMentionId+'}';
		  WeiboPrivacyAndroid.updateState('http://api.weibo.cn/2/setting/setprivacy',json);
		  updateUI = true;
	  }
	  
	  //判断开关变量是否有更新
	  if(this.state.mobileSwitchIsOn !== nextState.mobileSwitchIsOn 
			  ||this.state.contactListSwitchIsOn !== nextState.contactListSwitchIsOn 
			  ||this.state.picCmtSwitchIsOn !== nextState.picCmtSwitchIsOn){
		  updateUI = true;
	  }

	  return updateUI;
  },

  render: function() {
	console.log('render');
	console.log(WeiboPrivacyAndroid.Tag,'PrivacySettingPage',this.state.mobileSwitchIsOn,this.state.contactListSwitchIsOn,
			this.state.currentCommentId,this.state.picCmtSwitchIsOn,this.state.currentMentionId);

	var	bindstatus=this.state.bindstatus===1?
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
        </PageBlock>:null;
	
    return (
      <PageView title="隐私设置">
        {bindstatus}
        <PageBlock title="哪些人可以评论我的微博" description='关闭后，你的通讯录好友将不能通过通讯录找到你'>
        	<TouchableHighlight onPress={()=>{this.setState({currentCommentId:this.state.all});}}>
        		<View>
        			<SwitchItem title="所有人">
        				<Text>{this.state.currentCommentId===this.state.all?'checked':''}</Text>
        			</SwitchItem>
        		</View>
	        </TouchableHighlight>
	        <TouchableHighlight onPress={()=>{this.setState({currentCommentId:this.state.myfollow});}}>
    			<View>
    				<SwitchItem title="我关注的人">
        				<Text>{this.state.currentCommentId===this.state.myfollow?'checked':''}</Text>
        			</SwitchItem>
    			</View>
	        </TouchableHighlight>
    		<TouchableHighlight onPress={()=>{this.setState({currentCommentId:this.state.myfans});}}>
    			<View>
    				<SwitchItem title="我的粉丝">
        				<Text>{this.state.currentCommentId===this.state.myfans?'checked':''}</Text>
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
        	<TouchableHighlight onPress={()=>{this.setState({currentMentionId:this.state.all});}}>
        		<View>
        			<SwitchItem title="所有人">
        				<Text>{this.state.currentMentionId===this.state.all?'checked':''}</Text>
        			</SwitchItem>
        		</View>
	        </TouchableHighlight>
			<TouchableHighlight onPress={()=>{this.setState({currentMentionId:this.state.myfollow});}}>
				<View>
					<SwitchItem title="我关注的人">
						<Text>{this.state.currentMentionId===this.state.myfollow?'checked':''}</Text>
					</SwitchItem>
				</View>
	        </TouchableHighlight>
        </PageBlock>
        
      </PageView>
    );
  },
  
  componentDidUpdate:function(){
	  console.log('componentDidUpdate');
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

var styles = StyleSheet.create({
	text: {
	    fontSize: 12,
	    color: '#4EB934',
	  },
});

module.exports = PrivacySettingPage;
