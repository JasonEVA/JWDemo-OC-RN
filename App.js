import React, { Component } from 'react';
import {NavigatorIOS,Alert,FlatList, Text, View ,StyleSheet,NativeModules} from 'react-native';
import PropTypes from 'prop-types';

import FadeInView from './FadeInView';
import JWListItem from './JWListItem';
import YDAboutView from './YDAboutView';


var cat = require('react-native').NativeModules.RNBridgeModule;



export default class NavigatorIOSApp extends Component {
    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: JWFlatList,
                    title: 'My Initial Scene',
                    leftButtonTitle:'Dismiss',   // 实例化左边按钮
                    onLeftButtonPress:()=>cat.JWDismissVC('1231231321'),  // 左边按钮点击事件
                    rightButtonTitle:'右边',  // 实例化右边按钮
                    onRightButtonPress:() => {alert('右边')}  // 右边按钮点击事件
                }}
                style={{flex: 1}}
            />
        )
    }
}


class JWFlatList extends Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        navigator: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this._onForward = this._onForward.bind(this);
    }

    //点击列表点击每一行
    _onForward(jwKey) {
        this.props.navigator.push({
            component:YDAboutView,     // 需要跳转的页面
            title:jwKey      // 跳转页面导航栏标题
        });
    }

    render() {
    return (
      <View style={jwstyles.jwcontainer}>
        <FlatList
          data={[
            {key: 'WebView'},
            {key: 'Jackson'},
          ]}
          renderItem={this._renderItem}
        />}

        />
      </View>
    );
  }

    _renderItem = ({item}) => (
        <JWListItem
            id={item.id}
            onPressItem={()=>this._onForward(item.key)}
            // selected={!!this.state.selected.get(item.id)}
            jwtitle={item.key}
        />
    );

}


const jwstyles = StyleSheet.create({
	jwcontainer:{
		flex:1,
		paddingTop:0
	},

	jwitem:{
		padding:10,
		fontSize:18,
		height:44,
	},
})
// module.exports = JWFlatList;
