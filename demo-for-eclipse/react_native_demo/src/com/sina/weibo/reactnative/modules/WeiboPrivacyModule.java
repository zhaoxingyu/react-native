/**
 * react native module
 * author:xiaofei9
 */
package com.sina.weibo.reactnative.modules;

import java.util.Iterator;
import java.util.Map;

import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.common.MapBuilder;

public class WeiboPrivacyModule  extends ReactContextBaseJavaModule {
	private static final String TAG = "WeiboPrivacyModule";
	private static final String KEY_COMMENT = "comment";
	private static final String KEY_MOBILE = "mobile";
	private static final String KEY_BINDSTATUS = "bindstatus";
	private static final String KEY_MENTION = "mention";
	private static final String KEY_CONTACT_LIST = "contact_list";
	private static final String KEY_PIC_CMT_IN = "pic_cmt_in";
//	private Context mContext;

	public WeiboPrivacyModule(ReactApplicationContext reactContext) {
		super(reactContext);
//		mContext = reactContext.getApplicationContext();
	}

	@Override
	public String getName() {
		return "WeiboPrivacyAndroid";
	}
	
	@Override
	public Map<String, Object> getConstants() {
	    final Map<String, Object> constants = MapBuilder.newHashMap();
	    constants.put("Tag", TAG);
	    return constants;
	 }
	
	@ReactMethod
	public void getStates(String url, Callback result){
		JSONObject jsonData =  getJsonData();	
		
		//使用weibo中的网络请求流程，集成到微博工程之后可以使用
		/*RequestParam param = new RequestParam(mContext,user);
		JSONObject jsonData = getPrivacyStates(url,param);*/
		
		Log.d(TAG,jsonData.toString());
		result.invoke(jsonData.toString());
	}
	
	/**
	 * 使用weibo中的http get网络请求流程，集成到微博工程之后可以使用
	 * @return 
	 */
	/*public JSONObject getPrivacyStates(String url,RequestParam requestParam)
            throws WeiboApiException, WeiboParseException, WeiboIOException {
       Bundle getParams = requestParam.getNetRequestGetBundle();

       HttpResult content = NetUtils.openUrl(url.toString(),
                NetUtils.METHOD_GET, requestParam, mContext);
        JSONObject result = new JSONObject(content.httpResponse);
       try {
            return new JSONObject(content.httpResponse);
        } catch (JSONException e) {
            WeiboParseException e1 = new WeiboParseException(e);
            NetUtils.dealWeiboParseException(mContext, content, e1);
            throw e1;
        }
    }*/
	
	/**
	 * 使用weibo中的http post网络请求流程，集成到微博工程之后可以使用
	 * @return 
	 */
	/*public String updatePrivacyStates(String url,RequestParam requestParam)
            throws WeiboApiException, WeiboParseException, WeiboIOException {
       Bundle postParams = requestParam.getNetRequestPostBundle();

       HttpResult content = NetUtils.openUrl(url.toString(),
                NetUtils.METHOD_POST, requestParam, mContext);
        return content.httpResponse;
    }*/
	
	private JSONObject getJsonData(){
		JSONObject jsonData = new JSONObject();
		JSONObject jsonObjectP = new JSONObject();
		JSONObject jsonObjectM = new JSONObject();
		try {
			jsonObjectP.put(KEY_COMMENT, 3);
			jsonObjectP.put(KEY_MOBILE, 1);
			jsonObjectP.put(KEY_BINDSTATUS, 1);
			jsonObjectM.put(KEY_MENTION, 0);
			jsonObjectM.put(KEY_CONTACT_LIST, 0);
			jsonObjectM.put(KEY_PIC_CMT_IN, 0);
			
			jsonData.put("privacy",jsonObjectP);
			jsonData.put("mention",jsonObjectM);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonData;
	}
	
	@ReactMethod
	public void updateState(String url, String jsonString){
		JSONObject json = new JSONObject();
		//RequestParam param = new RequestParam(mContext,user);
		try {
			if(!TextUtils.isEmpty(jsonString)){
				json = new JSONObject(jsonString);
				Iterator<?> it = json.keys();  
		        while (it.hasNext()) {  
		            String key = (String) it.next();  
		            Integer value = json.getInt(key); 
		            if(key.equals("mobile")||key.equals("comment")){
		            	key = "allow_" + key;
		            }
		            //param.putInt(key,value);
		            Log.d("ReactNativeModule","update state " + key +" with value " + value);
		        }  
			}
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}  
		
		/*updatePrivacyStates(url,param);*/
	}

}
