// 活动半透明覆盖层

import React, { Component } from 'react';
import {View ,StyleSheet,Button,Text,Image} from 'react-native';


class YDFindActivityItemAlphaView extends Component {
    render() {
        return (
            <View style = {[styles.container,this.props.style]}>
                <View style = {styles.leftLineStyle}/>
                <Text style = {styles.textStyle}>活动结束</Text>
                <View style = {styles.rightLineStyle}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#000000',
        opacity:0.6,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    leftLineStyle:{
        width:50,
        height:1,
        backgroundColor:'white',
        marginLeft:15,
    },
    rightLineStyle:{
        width:50,
        height:1,
        backgroundColor:'white',
        marginRight:15,
    },
    textStyle:{
        textAlign: 'center',
        color:'white',
        fontSize:18,
    },

})

module.exports = YDFindActivityItemAlphaView;