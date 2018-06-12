// 公告自定义cell
import React, { Component } from 'react';
import {View ,StyleSheet,Text,TouchableHighlight,Image} from 'react-native';

class YDFindNotoceItem extends Component{
    _onPress = () => {
        this.props.onPressItem();
    };

    render() {
        return (
            <TouchableHighlight
                onPress = {this._onPress}
            >
                <View style = {style = styles.container}
                >

                    <Text style = {styles.highlightTitleStyle}>
                        {this.props.model.type == 0 ? '[还款公告] ':''}
                        <Text style = {styles.titleStyle}>{this.props.model.title}</Text>

                    </Text>
                    <Text style = {styles.timeStyle}>{this.props.model.releaseTime}</Text>

                    <Image
                        source = {require('./Image/rightArrow.png')}
                        style = {styles.imageStyle}
                    />
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
        position:'absolute',
        right:15,
        marginTop:18,
        justifyContent:'center',
    },
    titleStyle:{
        textAlign: 'left',
        color:'#333333',
        fontSize:15,
        height:15,
        marginLeft:15,
        marginTop:10,
    },
    highlightTitleStyle:{
        textAlign: 'left',
        color:'#2196F3',
        fontSize:16,
        height:20,
        fontWeight:'bold',
        marginLeft:15,
        marginTop:10,
        marginRight:45,
    },
    timeStyle:{
        textAlign: 'left',
        color:'#999999',
        fontSize:12,
        height:15,
        marginLeft:15,
        marginTop:5,
        marginRight:15,
    },
})
module.exports = YDFindNotoceItem;