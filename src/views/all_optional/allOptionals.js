import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    Image,
    Platform,
    AsyncStorage
} from 'react-native';
import { observer, inject } from 'mobx-react/native';
// import { computed } from 'mobx';
import Icons from 'react-native-vector-icons/Ionicons';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height;
const IMG = require('../../img/404.jpg');

const X_WIDTH = 375;
const X_HEIGHT = 812;

function isIphoneX() {
    return (
        (Platform.OS === 'ios'
            && ((height === X_HEIGHT
                && width === X_WIDTH)
                || (height === X_WIDTH
                    && width === X_HEIGHT)))
        || Platform.OS === 'android'
    );
}

@inject('NoticeStore')
@observer
class AllOptional extends Component {
    static navigationOptions =({ navigation }) => ({
        title: '添加自选',
        headerLeft: (
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
                style={{
                    marginLeft: 15,
                    width: 25
                }}
            >
                <Icons name="ios-arrow-back" size={25} color="#FFF" />
            </TouchableOpacity>),
        headerRight: (
            <View>
                <Text style={{
                    fontSize: 18,
                    color: '#fff',
                    fontWeight: 'bold',
                    marginRight: 10
                }}
                />
            </View>),
        headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 18,
            color: '#fff',
            fontWeight: 'bold',
            flex: 1,
            textAlign: 'center'
        },
        headerStyle: {
            height: isIphoneX() ? 65 : 45,
            backgroundColor: '#F8260F',
            paddingTop: isIphoneX() ? 20 : 0,
            elevation: 0,
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: -1,
            arr: [],
            selfArray: '',
        };
    }

    componentDidMount() {
        const { params, data } = this.props.navigation.state.params;
        this.setState({
            arr: data
        });
        this.getSelf();
    }

    async getSelf() {
        const aryStr = await AsyncStorage.getItem('self');
        // console.log(aryStr);
        const ary = aryStr && aryStr.length ? JSON.parse(aryStr) : [];
        this.setState({
            selfArray: ary
        });
    }

    // 添加取消
    addOrCancel(key) {
        const arr = this.state.selfArray;
        if (arr.indexOf(key) !== -1) {
            const index = arr.indexOf(key);
            console.log(index);
            if (index > -1) {
                console.log(arr);
                arr.splice(index, 1);
            }
        } else {
            arr.push(key);
        }
        Alert.alert('提示', '操作成功');
        this.setState({
            selfArray: arr
        });
        // let newArr  = this.state.selfArray.filter((item)=>{
        //     return arr.indexOf(item.code) !== -1
        // });
        AsyncStorage.setItem('self', JSON.stringify(arr));
        console.log(arr);
    }

    render() {
        return (
            <SafeAreaView style={AllOptionalStyles.root}>
                <ScrollView>
                    <View style={[AllOptionalStyles.tabContent]}>
                        <ScrollView
                            directionalLockEnabled
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={AllOptionalStyles.ScrollWrapper}
                        >
                            {this.state.arr.map((item, idx) => {
                                const bg1 = !item.price ? 'rgba(247, 197, 182, 0.2)'
                                    : item.isUp ? 'rgba(247, 197, 182, 0.2)'
                                        : 'rgba(1, 173, 138, 0.07)';

                                const priceColor = !item.price ? '#F7C5B6'
                                    : item.isUp ? '#E84209' : '#009900';

                                const svgBg = !item.price
                                    ? '#F7C5B6' : item.isUp
                                        ? require('../../img/optional/up.png')
                                        : require('../../img/optional/down.png');

                                return (
                                    <View style={[AllOptionalStyles.cellRt]} key={idx}>
                                        <View
                                            activeOpacity={1}
                                            style={[AllOptionalStyles.itemContent,
                                                { backgroundColor: bg1 }]}
                                            onPress={() => {
                                            }}
                                        >
                                            <View style={{ justifyContent: 'space-around' }}>
                                                <Text style={{ fontSize: 15 }}>{item.name}</Text>
                                                <Text style={[{
                                                    fontSize: 20,
                                                    marginTop: 5,
                                                    color: priceColor
                                                }]}
                                                >
                                                    {!item.open && item.price ? item.price : '休市'}
                                                </Text>
                                            </View>
                                            <View style={{ justifyContent: 'space-around' }}>
                                                <View />
                                                <View style={{
                                                    flexDirection: 'row',
                                                    marginTop: 20,
                                                    justifyContent: 'space-around'
                                                }}
                                                >
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: priceColor,
                                                        marginRight: 10
                                                    }}
                                                    >
                                                        {item.rate ? item.rate : ''}
                                                    </Text>
                                                    <Text style={{
                                                        fontSize: 15,
                                                        color: priceColor,
                                                        marginRight: 10
                                                    }}
                                                    >
                                                        {item.rate ? item.rate : ''}
                                                    </Text>
                                                    {item.rate
                                                        ? (
                                                            <Image
                                                                source={svgBg}
                                                                style={{
                                                                    width: 15,
                                                                    height: 15,
                                                                    top: 5
                                                                }}
                                                            />
                                                        )
                                                        : (
                                                            <Text style={{
                                                                width: 130,
                                                                height: 15,
                                                                top: 5
                                                            }}
                                                            />
                                                        )}
                                                </View>
                                            </View>
                                            <View style={{
                                                flexDirection: 'row',
                                                justifyContent: 'space-around',
                                                marginTop: 20
                                            }}
                                            >
                                                <Text style={{ fontSize: 16, marginRight: 5 }}>持仓</Text>
                                                <Text style={{
                                                    fontSize: 17,
                                                    fontWeight: 'bold',
                                                    color: '#B62A20'
                                                }}
                                                >
                                                    0

                                                </Text>
                                            </View>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.addOrCancel(item.code);
                                                }}
                                            >
                                                <View style={{
                                                    backgroundColor:
                                                        this.state.selfArray.indexOf(item.code) === -1
                                                            ? '#CD3A3C' : '#00B38F',
                                                    width: 43,
                                                    height: 36,
                                                    justifyContent: 'space-around',
                                                    alignItems: 'center',
                                                    borderRadius: 4
                                                }}
                                                >
                                                    <Text style={{
                                                        fontSize: 16,
                                                        color: '#fff',
                                                        fontWeight: 'bold'
                                                    }}
                                                    >
                                                        {this.state.selfArray.indexOf(item.code) === -1
                                                            ? '添加' : '取消'}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const AllOptionalStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        backgroundColor: '#FFF'
    },
    mainContainer: {
        width,
        height,
        alignItems: 'center'
    },
    swiperContainer: {
        // height: 50,
        width,
        backgroundColor: '#fff',
        marginBottom: 10,
        justifyContent: 'space-around',
        // alignItems: 'center',
        paddingHorizontal: 35,
        paddingVertical: 10

    },
    noticeCon: {
        width,
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    IMGPNG: {
        width: 30,
        height: 30
    },
    tabContent: {
        width,
        backgroundColor: '#fff',
        paddingVertical: 5,
        marginVertical: 10,
        flex: 1
    },
    ScrollWrapper: {
        width,
        backgroundColor: '#fff'
    },
    cellRt: {
        width,
        height: 70,
    },
    itemContent: {
        width,
        flexDirection: 'row',
        paddingVertical: 2,
        height: 60,
        alignItems: 'center',
        justifyContent: 'space-around'

    },
});

export default AllOptional;
