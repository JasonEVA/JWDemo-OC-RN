import React, { Component } from 'react';
import {Alert,FlatList, Text, View ,StyleSheet} from 'react-native';

import JWBaseWebView from '../RNPart/JWBaseWebView';

class YDAboutView extends Component{
    render() {
        return (
            <JWBaseWebView
                url = {'https://twap.youdingkeji.com/client/aboutus'}
            />
        );
    }
}

module.exports = YDAboutView;