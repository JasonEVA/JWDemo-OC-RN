// 发现页主页头部

import React, { Component } from 'react';
import {View ,StyleSheet,Text,TouchableOpacity,Image} from 'react-native';

import JWBaseWebView from "../JWBaseWebView";

class YDFindHeader extends Component {

    constructor(props) {
        super(props);
        //当前页

        this.state = {
            headerData: "",
        };
    }

    componentDidMount () {
        this._fetchData();
    }

    render() {
        return(
            <View style = {styles.container}>
                 <View style = {styles.headContainer}>
                 <YDFindHeaderItem
                    imageName = {defaultImageArr[0]}
                    imageUrl = {this._isShowFromNetwork() ? this.state.headerData[0].image:''}
                    titel = {this._isShowFromNetwork() ? this.state.headerData[0].title : defaultTitelArr[0]}
                    onPressItem={()=>this._onForward(this._isShowFromNetwork() ? JSON.parse(this.state.headerData[0].ext).url:defaultUrlArr[0])}
                />
                <YDFindHeaderItem
                    imageName = {defaultImageArr[1]}
                    imageUrl = {this._isShowFromNetwork() ? this.state.headerData[1].image:''}
                    titel = {this._isShowFromNetwork() ? this.state.headerData[1].title : defaultTitelArr[1]}
                    onPressItem={()=>this._onForward(this._isShowFromNetwork() ? JSON.parse(this.state.headerData[1].ext).url:defaultUrlArr[1])}
                />
                <YDFindHeaderItem
                    imageName = {defaultImageArr[2]}
                    imageUrl = {this._isShowFromNetwork() ? this.state.headerData[2].image:''}
                    titel = {this._isShowFromNetwork() ? this.state.headerData[2].title : defaultTitelArr[2]}
                    onPressItem={()=>this._onForward(this._isShowFromNetwork() ? JSON.parse(this.state.headerData[2].ext).url:defaultUrlArr[2])}
                />
                <YDFindHeaderItem
                    imageName = {defaultImageArr[3]}
                    imageUrl = {this._isShowFromNetwork() ? this.state.headerData[3].image:''}
                    titel = {this._isShowFromNetwork() ? this.state.headerData[3].title : defaultTitelArr[3]}
                    onPressItem={()=>this._onForward(this._isShowFromNetwork() ? JSON.parse(this.state.headerData[3].ext).url:defaultUrlArr[3])}
                />  
                 </View>


                <View style = {styles.lineStyle}/>
            </View>
    );
    }

    _fetchData()
    {
        var url = 'http://tapi.youdingkeji.com/yiding-rest/rest/message/getDiscoveryPageOther.json';
        // post请求描述
        var requestDesc = { 
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:"appType=20001&channel=AppStore_test&deviceType=1&device_serial_id=565C3B6C-EA57-4B62-9DDF-1A734A825F5A&idfa=&phoneSystemVersion=11.4&supperUserId=&token=&userId=&versionName=1.4.0"
        };

        // 发送post请求
        fetch(url,requestDesc)
            .then((response)=>response.json())
            .then((json)=>{
                // alert(json.result[0].id);
                this.setState({
                    headerData :json.result.headNotice
                })
            })
            .catch((error)=>{
                failure(error);
            })

    }

    //点击事件
    _onForward(item) {
        if (!item || !item.length)
        {
            return;
        }
        const navigator = this.props.navigator;
        if(navigator) {
            navigator.push({
                component:JWBaseWebView,     // 需要跳转的页面
                passProps: {
                    url: item,
                }
            });
        }
    }

    _isShowFromNetwork() {
        return (this.state.headerData.length == 4);
    }


}

class YDFindHeaderItem extends  Component{

    _onPress = () => {
        this.props.onPressItem();
    };

    render() {
        return(
            <TouchableOpacity
                onPress = {this._onPress}
                activeOpacity = {0.9}
            >
                <View style = {styles.itemContainer}>
                    <Image
                        style={styles.itemImageStyle}
                        defaultSource = {this.props.imageName}
                        source = {{uri: barnnerHost + this.props.imageUrl}}
                    />
                    <Text style={styles.itemTextStyle}>{this.props.titel}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const hostUrl = 'https://twap.youdingkeji.com';
const hostUrl2 = 'https://tweb.youdingkeji.com';
const barnnerHost = 'https://timage.youdingkeji.com/';
const defaultTitelArr = ['新手礼包','夺首尾标','吐槽拿奖','周末专场'];
const defaultImageArr = [require('./Image/dis_package.png'),require('./Image/dis_endTarget.png'),require('./Image/dis_award.png'),require('./Image/dis_weekend.png')];
const defaultUrlArr = [ hostUrl2 + '/staticPages/appVue/dist/newEdition/index.html', hostUrl2 + '/headtail/index.html',hostUrl2 + '/tucao-prize/index.html',hostUrl + '/index.php/activity/newWeek'];


const styles = StyleSheet.create({
    container: {
        height:92,
    },
    headContainer: {
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    itemContainer: {
        alignItems:'center',
    },
    lineStyle:{
        height:0.5,
        // width:50,
        backgroundColor:'#999999',
        position:'absolute',
        left:15,
        right:15,
        bottom:1,
        // marginBottom:1,
    },
    itemImageStyle:{
        width:40,
        height:40,
        marginBottom:3,
    },
    itemTextStyle:{
        fontSize:12,
        textAlign: 'center',
        color:'#333333',
        marginTop:3,
    },
})

module.exports = YDFindHeader;