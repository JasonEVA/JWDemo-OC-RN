// 发现页主页
import React, { Component } from 'react';
import {Alert,ScrollView, Text, View ,StyleSheet,Animated,StatusBar} from 'react-native';

import ScrollableTabView, { ScrollableTabBar, DefaultTabBar } from 'react-native-scrollable-tab-view';

import YDFindActivityListView from './YDFindActivityList';
import YDFindNoticeList from './YDFindNoticeList';
import YDFindHeader from './YDFindHeader';

class YDFindView extends Component{
    constructor(props) {
        super(props);

        this.state = {
            leftLastOffset: 0,
            rightLastOffset: 0,
            anim: new Animated.Value(0), // init opacity 0
        };
    }
    render() {
        return (
                <Animated.View style={[styles.container,{
                    // opacity: this.state.anim.interpolate, // Binds directly
                    transform: [{
                        translateY: this.state.anim.interpolate({
                            inputRange: [0, 92],
                            outputRange: [0, 92],
                        }),
                    }],
                }]}>
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
                            callback = {(leftOffset) => this._leftChangeOffset(leftOffset)}
                        />
                        <YDFindNoticeList
                            navigator = {this.props.navigator}
                            style = {styles.noticeStyle}
                            tabLabel='官方公告'
                            callback = {(rightOffset) => this._rightChangeOffset(rightOffset)}
                        />
                    </ScrollableTabView>

                </Animated.View>

        );
    }

    _leftChangeOffset(leftOffset) {
        this._changeBannerOffsetWithTableViewY(leftOffset,leftOffset - this.state.leftLastOffset > 0);
        this.setState({
            leftLastOffset :leftOffset ,
        });
    }

    _rightChangeOffset(rightOffset) {
        this._changeBannerOffsetWithTableViewY(rightOffset,rightOffset - this.state.rightLastOffset > 0);
        this.setState({
            rightLastOffset :rightOffset ,
        });
    }

    _changeBannerOffsetWithTableViewY(offsetY,isUp) {
        var tempOffset = 1;

        if (offsetY > 0 && isUp) {
            // 上拉
            tempOffset = -92;
        }
        else if((offsetY < 0 || offsetY == 0) && !isUp ){
            // 下拉
            tempOffset = 0;
        }
        if (tempOffset > 0) {
            return;
        }

        Animated.timing(          // Uses easing functions
            this.state.anim,    // The value to drive
            {
                toValue: tempOffset,
                duration: 80,
                useNativeDriver: true, // <-- 加上这一行使用原生动画驱动（更流畅）
            },           // Configuration
        ).start();                // Don't forget start!

        // alert(isUp);
    }

}

var Dimensions = require('Dimensions');
var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
        // flex:1,
        marginTop: 64,
        height:windowHeight-64+92,
    },
    tabcontainer: {
    },
    contentContainer: {
        // width:windowWidth * 2,
        height:windowHeight,
    },
    activityStyle:{
        width:windowWidth,
        // height:windowHeight,
    },
    noticeStyle:{
        width:windowWidth,
        // height:windowHeight,
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