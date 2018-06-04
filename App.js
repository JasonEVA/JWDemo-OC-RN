import React, { Component } from 'react';
import {NavigatorIOS,Alert,FlatList, Text, View ,StyleSheet,NativeModules} from 'react-native';
import PropTypes from 'prop-types';
import codePush from 'react-native-code-push';

import FadeInView from './FadeInView';
import JWListItem from './JWListItem';
import YDAboutView from './YDAboutView';


var cat = require('react-native').NativeModules.RNBridgeModule;



export default class NavigatorIOSApp extends Component {

    componentDidMount() {
        codePush.sync({
            updateDialog: {
                mandatoryContinueButtonLabel:'更新',
                mandatoryUpdateMessage:'有新版本了，请您及时更新',
                optionalIgnoreButtonLabel: '稍后',
                optionalInstallButtonLabel: '后台更新',
                optionalUpdateMessage: '有新版本了，是否更新？',
                title: '更新提示'
            },
            mandatoryInstallMode:codePush.InstallMode.IMMEDIATE,
            // deploymentKey: 'gcm86SIDmRPQs4jD9OvEHXWEX1TA41696933-a012-4f70-9c86-b0d3f3a2c20b',
        });
    }

    render() {
        return (
            <NavigatorIOS
                initialRoute={{
                    component: JWFlatList,
                    title: 'My Initial Scene',
                    leftButtonTitle:'Dismiss',   // 实例化左边按钮
                    onLeftButtonPress:()=>cat.JWDismissVC('1231231321'),  // 左边按钮点击事件
                    rightButtonTitle:'JasonWang1',  // 实例化右边按钮
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
