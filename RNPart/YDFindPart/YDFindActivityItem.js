import React, { Component } from 'react';
import {View ,StyleSheet,Button,Text,Image,TouchableHighlight} from 'react-native';

import moment from 'moment';

import YDFindActivityItemAlphaView from './YDFindActivityItemAlphaView';

class YDFindActivityItem extends Component{
    _onPress = () => {
        this.props.onPressItem();
    };

    render() {
        console.log(this.props);
        let alphaView = this.props.model.activityStatus != 1 ? <YDFindActivityItemAlphaView style = {styles.alphaStyle}/> : null; //活动结束标识
        return (
            <TouchableHighlight
                onPress = {this._onPress}
            >
                <View style = {style = styles.container}
                >
                    <Image
                        defaultSource = {require('../001.png')}
                        // source = {require('../001.png')}
                        style = {styles.imageStyle}
                        source = {{uri: BaseUrl + this.props.model.image}}
                    />
                    {alphaView}
                    <Text style = {styles.titleStyle}>{this.props.model.title}</Text>
                    <Text style = {styles.timeStyle}>{moment(this.props.model.startTime).format("YYYY-MM-DD HH:mm")}</Text>

                </View>
            </TouchableHighlight>

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