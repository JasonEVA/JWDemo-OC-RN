import React, { Component } from 'react';
import {Alert,FlatList, Text, View ,StyleSheet} from 'react-native';

import YDFindActivityListView from './YDFindActivityList';

class YDFindView extends Component{
    render() {
        return (
            <View style={styles.container}>
                <YDFindActivityListView navigator = {this.props.navigator}
                />
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:0
    },

    jwitem:{
        padding:10,
        fontSize:18,
        height:44,
    },
})

module.exports = YDFindView;