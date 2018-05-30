import React, { Component } from 'react';
import {View ,StyleSheet,Button,Text} from 'react-native';

class JWListItem extends Component{
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        return (
            <Text
                style={jwstyles.jwitem}
                onPress = {this._onPress}
            >{this.props.jwtitle}</Text>
        )
    }
}

const jwstyles = StyleSheet.create({
    jwcontainer:{
        flex:1,
        paddingTop:60
    },

    jwitem:{
        padding:10,
        fontSize:18,
        height:44,
        color:'red',
    },
})
module.exports = JWListItem;