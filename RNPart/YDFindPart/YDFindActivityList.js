// 发现页活动list
import React, { Component } from 'react';
import {Alert,FlatList, Text, View ,StyleSheet} from 'react-native';

import YDFindActivityItem from './YDFindActivityItem';
import JWBaseWebView from '../JWBaseWebView';

class YDFindActivityListView extends Component{

    constructor(props) {
        super(props);
        //当前页
        this.page = 1

        this.state = {
            activeDataSource: "",
            // 刷新状态
            isRefresh:false,
            isFinish:false,
        };
    }

    componentDidMount () {
        this.fetchData();
    }


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.activeDataSource}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this._separator}
                    // ListFooterComponent={this._footer}
                    // getItemLayout={(data,index)=>(
                    //     {length: itemHeight, offset: (itemHeight+separatorHeight) * index, index}
                    // )}
                    //下拉刷新相关
                    onRefresh={() => this._onRefresh()}
                    refreshing={this.state.isRefresh}
                    //加载更多
                    onEndReached={() => this._onLoadMore()}
                    onEndReachedThreshold={0.01}
                />}
                />
            </View>
        );
    }

    fetchData()
    {
        var url = 'http://tapi.youdingkeji.com/yiding-rest/rest/message/getHistoryEvent.json';
        // post请求描述
        var requestDesc = {
            method:'POST',
            headers:{
                'Content-Type':'application/x-www-form-urlencoded',
            },
            body:"appType=20001&channel=AppStore_test&deviceType=1&device_serial_id=565C3B6C-EA57-4B62-9DDF-1A734A825F5A&idfa=&phoneSystemVersion=11.4&supperUserId=&token=&userId=&versionName=1.4.0&page="+ this.page
        };

        // 发送post请求
        fetch(url,requestDesc)
            .then((response)=>response.json())
            .then((json)=>{
                // alert(json.result[0].id);
                if (!json.result||!json.result.length) {
                    this.setState({
                        isFinish : true
                    });
                }
                if(this.page == 1){
                    this.setState({
                        activeDataSource :json.result ,
                        isRefresh : false
                    });
                }
                else {
                    this.setState({
                        activeDataSource :this.state.activeDataSource.concat(json.result),
                    });
                }

            })
            .catch((error)=>{
                this.setState({
                    isRefresh : false
                });
                failure(error);
            })

    }

    _keyExtractor = (item, index) => item.id;

    _renderItem = ({item}) => (
        <View style = {styles.cell}>
        <YDFindActivityItem
            keyExtractor={this._keyExtractor}
            onPressItem={()=>this._onForward(item)}
            // selected={!!this.state.selected.get(item.id)}
            model={item}
            style = {{flex:1}}
        />
        </View>
    );

    _footer = () => {
        return <Text style={[styles.txt,{backgroundColor:'black'}]}>本产品由杭州溢鼎科技有限公司版权所有</Text>;
    }
    _separator = () => {
        return <View style={{height:separatorHeight,backgroundColor:'#999999',marginLeft:15,marginRight:15}}/>;
    }


    //点击列表点击每一行
    _onForward(item) {
        // alert(JSON.parse(ext));
        if (item.activityStatus != 1)
        {// 活动结束
            return;
        }
        const navigator = this.props.navigator;
        if(navigator) {
            navigator.push({
                component:JWBaseWebView,     // 需要跳转的页面
                passProps: {
                    url: JSON.parse(item.ext).url,
                }
            });
        }
    }

    /**
     * 下啦刷新
     * @private
     */
    _onRefresh=()=>{
        // 不处于 下拉刷新
        if(!this.state.isRefresh){
            this.page = 1;
            this.state.isFinish = false;
            this.state.isRefresh = true;
            this.fetchData()
        }
    };

    /**
     * 加载更多
     * @private
     */
    _onLoadMore(){
        // 不处于正在加载更多 && 有下拉刷新过，因为没数据的时候 会触发加载
        if (!this.state.isRefresh && this.state.activeDataSource.length > 0 && !this.state.isFinish){
            this.page = this.page + 1
            this.fetchData()
        }
    }

}

const itemHeight = 220;

const separatorHeight = 0.25;

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:0
    },
    cell:{
        flex:1,
        height:itemHeight,
        // backgroundColor:'purple',
    },

    txt: {
        textAlign: 'center',
        textAlignVertical:'center',
        color:'white',
        fontSize:30,
    },
})

module.exports = YDFindActivityListView;