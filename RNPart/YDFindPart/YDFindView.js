// 发现页主页
import React, { Component } from 'react';
import {Alert,ScrollView, Text, View ,StyleSheet} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

import YDFindActivityListView from './YDFindActivityList';
import YDFindNoticeList from './YDFindNoticeList';
import YDFindHeader from './YDFindHeader';

class YDFindView extends Component{

    render() {
        return (
            <View style={styles.container}>
                <YDFindHeader
                    navigator = {this.props.navigator}
                />
                <ScrollableTabView
                    style={styles.tabcontainer}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarUnderlineStyle={styles.lineStyle}
                    tabBarActiveTextColor='#CCAA66'
                    tabBarInactiveTextColor='#666666'

                >

                    <YDFindActivityListView
                        navigator = {this.props.navigator}
                        style = {styles.activityStyle}
                        tabLabel='平台活动'
                    />
                    <YDFindNoticeList
                        navigator = {this.props.navigator}
                        style = {styles.noticeStyle}
                        tabLabel='官方公告'
                    />
                </ScrollableTabView>




             </View>
        );
    }

}

var Dimensions = require('Dimensions');
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: 90,
    },
    tabcontainer: {
    },
    contentContainer: {
        // width:windowWidth * 2,
        height:windowHeight,
    },
    activityStyle:{
        width:windowWidth,
        height:windowHeight,
    },
    noticeStyle:{
        width:windowWidth,
        height:windowHeight,
    },
    lineStyle: {
        width:windowWidth/2,
        height: 2,
        backgroundColor: '#CCAA66',

    },
    textStyle: {
        flex: 1,
        fontSize:20,
        marginTop:20,
        textAlign:'center',
    },
})

module.exports = YDFindView;