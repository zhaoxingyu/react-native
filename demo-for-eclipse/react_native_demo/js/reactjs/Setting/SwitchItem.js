/**
 * The examples provided by Facebook are for non-commercial testing and
 * evaluation purposes only.
 * 
 * Facebook reserves all rights not expressly granted.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 
 * @providesModule SwitchItem
 * @flow
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} = React;

var WeiboPrivacyAndroid = require('WeiboPrivacyAndroid');

var SwitchItem = React.createClass({
	propTypes: {
		type: React.PropTypes.string,
		id: React.PropTypes.string,
		selected: React.PropTypes.bool,
		
	    title: React.PropTypes.string,
	    description: React.PropTypes.string,
	},
	
	getInitialStates:function(){
		return{
			comment_all:0,
			comment_myfavorite:1,
			comment_myfollow:2,
			metion_all:0,
			mention_myfavorite:1,
		};
	},
	  
	render:function(){
		return(
			<TouchableHighlight onPress={this.handleUpdateState}>	
				<View style={styles.container}>
			        <View>
			          <Text style={styles.titleText}>
			            {this.props.title}
			          </Text>
			        </View>
			        <View style={styles.children}>
			          {this.props.children}
			        </View>
		      </View>
	      </TouchableHighlight>
		);
	},
	
	handleUpdateState:function(){
	  console.log('handle update');
	  if(this.props.type == 'comment'){
		  
	  }
	  var test = this.props.id+':0';
	  console.log(test);
	  var json = '{'+this.props.id+':'+1+'}';
	  console.log(JSON.stringify(json));
	  WeiboPrivacyAndroid.updateState('http://api.weibo.cn/2/setting/setprivacy',json);
	},
});

var styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor:'#E6E6E6',
  },
  text: {
    color: '#333333',
  },
  children: {
	position: 'absolute',
    right: 10,
    flexDirection:'row',
    alignItems: 'center', 
    justifyContent: 'center',
  }
});

module.exports = SwitchItem;