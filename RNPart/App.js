import React, { Component } from 'react';
import {NavigatorIOS,Alert,FlatList, Text, View ,StyleSheet,NativeModules} from 'react-native';
// import PropTypes from 'prop-types';
import codePush from 'react-native-code-push';

import FadeInView from './FadeInView';
import JWListItem from './JWListItem';
import YDAboutView from './YDAboutView';
import YDFindView from './YDFindPart/YDFindView';


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
                    title: 'RN Demo',
                    leftButtonTitle:'Dismiss',   // 实例化左边按钮
                    onLeftButtonPress:()=>cat.JWDismissVC('1231231321'),  // 左边按钮点击事件
                    rightButtonTitle:'JasonWang',  // 实例化右边按钮
                    onRightButtonPress:() => {alert('右边')}  // 右边按钮点击事件
                }}
                renderScene={(route,navigator) => { // 将板块生成具体的组件
                    let Component = route.component;// 获取路由内的板块
                    return <Component {...route.params} navigator={navigator} />    // 根据板块生成具体组件

                }}

                style={{flex: 1}}
            />
        )
    }
}


class JWFlatList extends Component {
    // static propTypes = {
    //     title: PropTypes.string.isRequired,
    //     navigator: PropTypes.object.isRequired,
    // }

    constructor(props, context) {
        super(props, context);
        this._onForward = this._onForward.bind(this);
    }


    //点击列表点击每一行
    _onForward(jwKey) {

        var name = YDAboutView;
        switch (jwKey) {
            case "WebView":
                name = YDAboutView;
                break;
            case "Find":
                name = YDFindView;
                break;
        };

        this.props.navigator.push({
            component:name,     // 需要跳转的页面
            title:jwKey      // 跳转页面导航栏标题
        });
    }

    // _keyExtractor = (item, index) => index;

    render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'WebView'},
            {key: 'Find'},
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this._renderItem}
          ListHeaderComponent={this._header}
          ListFooterComponent={this._footer}
          ItemSeparatorComponent={this._separator}
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

    _header = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是头部</Text>;
    }

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>这是尾部</Text>;
    }

    _separator = () => {
        return <View style={{height:2,backgroundColor:'yellow'}}/>;
    }

}


const styles = StyleSheet.create({
	container:{
		flex:1,
		paddingTop:0
	},

	item:{
		padding:10,
		fontSize:18,
		height:44,
	},
    txt: {
        textAlign: 'center',
        textAlignVertical:'center',
        color:'white',
        fontSize:30,
    },
})
// module.exports = JWFlatList;
