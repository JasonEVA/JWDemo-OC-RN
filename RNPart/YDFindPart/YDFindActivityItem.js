// 活动自定义cell

import React, { Component } from 'react';
import {View ,StyleSheet,Button,Text,Image,TouchableOpacity} from 'react-native';

import moment from 'moment';

import YDFindActivityItemAlphaView from './YDFindActivityItemAlphaView';

class YDFindActivityItem extends Component{
    _onPress = () => {
        this.props.onPressItem();
    };

    render() {
        let alphaView = this.props.model.activityStatus != 1 ? <YDFindActivityItemAlphaView style = {styles.alphaStyle}/> : null; //活动结束标识
        let titleView = this.props.model.title && this.props.model.title.length > 0 ? <Text style = {styles.titleStyle}>{this.props.model.title}</Text> : null;

        return (
            <TouchableOpacity
                onPress = {this._onPress}
                activeOpacity = {0.9}
            >
                <View style = {style = styles.container}
                >
                    <Image
                        defaultSource = {require('./Image/activeDefult.png')}
                        style = {styles.imageStyle}
                        source = {{uri: BaseUrl + this.props.model.image}}
                    />
                    {alphaView}
                    {titleView}
                    <Text style = {styles.timeStyle}>{moment(this.props.model.startTime).format("YYYY-MM-DD HH:mm")}</Text>

                </View>
            </TouchableOpacity>

        )
    }
}

var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
let BaseUrl = 'https://timage.youdingkeji.com/';

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
    },

    imageStyle:{
        height:150,
        width:width - 15 * 2,
        borderRadius:10,
        marginTop:15,
        marginLeft:15,
        marginRight:15,
    },
    titleStyle:{
        textAlign: 'left',
        color:'#999999',
        fontSize:13,
        height:15,
        marginLeft:15,
        marginTop:10,
        marginRight:15,
    },
    timeStyle:{
        textAlign: 'left',
        color:'#999999',
        fontSize:11,
        height:15,
        marginLeft:15,
        marginTop:5,
        marginRight:15,
        marginBottom:10,
    },
    alphaStyle:{
        height:150,
        width:width - 15 * 2,
        borderRadius:10,
        position:'absolute',
        top:15,
        left:15,
    },
})
module.exports = YDFindActivityItem;