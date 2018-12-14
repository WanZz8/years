import React, { Component } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StatusBar,
    StyleSheet,
    Image,
    BackHandler,
    ToastAndroid,
    Dimensions,
    Animated,
    Platform,
    Modal,
    Easing,
    TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
import { observer, inject } from 'mobx-react/native';
import Icons from 'react-native-vector-icons/Ionicons';
import SafeBody from '../../common/safeView';
import Position from './subpage/position';
import { GET } from '../../utils/request';
import { HOST, SCREEN_WIDTH } from '../../config/baseConfig';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
const IMG = {
    ban: require('../../img/home/Bitmap.png'),
    person: require('../../img/home/a2.png'),
    a3: require('../../img/home/a3.png'),
    a4: require('../../img/home/a4.png'),
    a5: require('../../img/home/a5.png'),
    b1: require('../../img/home/b1.png'),
    c1: require('../../img/home/c1.png'),
    c2: require('../../img/home/c2.png'),
    account: require('../../img/mine/account.png'),
    coin: require('../../img/mine/coinAdd.png'),
    IMG1: require('../../img/home/s1.png'),
    IMG2: require('../../img/home/s2.png'),
    IMG3: require('../../img/home/s3.png'),
    IMG4: require('../../img/home/s4.png'),
    ss: require('../../img/home/lightning.png')
};

@inject('HomeStore', 'MainStore', 'CacheStore')
@observer
class HomePage extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            swiperShow: false,
            left: new Animated.Value(0),
            isModal: false,
            list: []
        };
    }

    componentDidMount() {
        this.props.HomeStore.getNotice();
        setTimeout(() => {
            this.setState({ swiperShow: true });
        }, 0);
        this.getNewsInfo(0);
        console.log(`销毁${1}`);
    }

    componentWillUnmount() {
        // console.log('销毁');
        // if (Platform.OS === 'android') {
        //     BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
        // }
    }

    renderRow() {
        const arr = this.state.list.slice(0, 5);
        const content = arr.map((item, idx) => {
            const img = item.thumb;
            return (
                <View style={HomeStyles.weekBar} key={idx}>
                    <TouchableHighlight
                        activeOpacity={1}
                        underlayColor="#e6e6e6"
                        style={{ width: '100%' }}
                        onPress={() => {
                            this.props.navigation.navigate('News');
                        }}
                    >
                        <View style={HomeStyles.oilContainer}>
                            <View style={HomeStyles.oilItemView}>
                                <Text style={HomeStyles.oilText1}>
                                    {item.title}
                                </Text>
                                <View style={HomeStyles.oilTxCont}>
                                    <Text style={HomeStyles.oilText2}>
                                        {item.date}
                                    </Text>
                                    <Text style={HomeStyles.oilText3}>...</Text>
                                </View>
                            </View>
                            {img ? (
                                <Image
                                    source={{ uri: img }}
                                    style={HomeStyles.oilImageView}
                                />
                            ) : (
                                <Image
                                    style={HomeStyles.oilImageView}
                                    source={IMG.ss}
                                />
                            ) }
                        </View>
                    </TouchableHighlight>
                </View>
            );
        });
        return content;
    }

    handleDirm() {
        Animated.timing(// 使用timin过度动画
            this.state.left, // 要改变的动画对象
            {
                toValue: width * 0.7, // 动画结束值
                duration: 300, // 动画运行时
                easing: Easing.linear
            }
        ).start();// 动画开始执行

        setTimeout(() => {
            this.showModal();
        }, 300);
    }

    showModal() {
        this.setState({
            isModal: true
        });
    }


    onRequestClose() {
        this.setState({
            isModal: false
        });

        Animated.timing(// 使用timin过度动画
            this.state.left, // 要改变的动画对象
            {
                toValue: 0, // 动画结束值
                duration: 300, // 动画运行时
                easing: Easing.linear
            }
        ).start();// 动画开始执行
    }

    async getNewsInfo(type, date) {
        const result = await GET(`${HOST}/news/newsList.htm`, {
            type,
            date
        });
        if (result && result.code === 200 && result.newsList.length) {
            this.setState({
                list: result.newsList
            });
        }
        console.log(result);
    }

    sharelink() {
        let data = this.props.CacheStore.isLogin;
        data ? this.props.navigation.navigate(
            'Share'
        ) : Alert.alert('提示', '你还没有登录');
    }

    renderSwiper() {
        if (this.state.swiperShow) {
            return (
                <Swiper
                    autoplay
                    horizontal
                    autoplayTimeout={3}
                    containerStyle={{ width }}
                    removeClippedSubviews={false}
                >
                    <Image
                        source={IMG.banner1}
                        style={HomeStyles.bannerImg}
                    />
                    <Image
                        source={IMG.banner2}
                        style={HomeStyles.bannerImg}
                    />
                </Swiper>
            );
        }
    }

    render() {
        const arr = this.props.HomeStore.noticeAry.slice();
        const params = this.props.MainStore.quoteData.slice();
        const data = this.props.MainStore.TradeLists;
        const data1 = this.props.MainStore.TradeArr;
        const { navigation } = this.props;

        return (
            <SafeBody style={HomeStyles.root}>
                <View style={HomeStyles.AllCon}>
                    <View style={HomeStyles.position1}>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            flex: 3,
                            paddingLeft: 20,
                        }}
                        >
                            <View style={{
                                backgroundColor: '#E9E9E9',
                                width: 60,
                                borderRadius: 50,
                                height: 60,
                                marginTop: 10,
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                flexDirection: 'row',
                                marginRight: 20
                            }}
                            >
                                <Image
                                    source={IMG.person}
                                    style={{
                                        width: 35,
                                        height: 35
                                    }}
                                />
                            </View>
                            <Text style={{
                                fontSize: 17

                            }}
                            >
                                你好, 欢迎回来
                            </Text>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            flex: 4,
                        }}
                        >
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        this.props.navigation.navigate(
                                            'Optional', { params, data }
                                        );
                                    }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderBottomColor: '#cccccc',
                                    borderBottomWidth: 0.8,
                                    width: '100%',
                                    marginBottom: 5,
                                    paddingLeft: 30
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-around',
                                    alignItems: 'center',
                                    height: 50
                                }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}
                                    >
                                        <Image
                                            source={IMG.a4}
                                        />
                                        <Text style={{
                                            fontSize: 16,
                                            marginLeft: 25,
                                            color: '#343434'
                                        }}
                                        >
                                            我的自选
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (params.length && data.length) {
                                        this.props.navigation.navigate(
                                            'Sort', { params, data }
                                        );
                                    }
                                }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderBottomColor: '#cccccc',
                                    borderBottomWidth: 0.6,
                                    width: '100%',
                                    marginBottom: 5,
                                    paddingLeft: 30
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-around',
                                    alignItems: 'center',
                                    height: 50
                                }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}
                                    >
                                        <Image
                                            source={IMG.a5}
                                        />
                                        <Text style={{
                                            fontSize: 16,
                                            marginLeft: 25,
                                            color: '#343434'
                                        }}
                                        >
                                            排行榜
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        this.props.navigation.navigate(
                                            'UserInfo'
                                        );
                                    }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderBottomColor: '#cccccc',
                                    borderBottomWidth: 0.6,
                                    width: '100%',
                                    marginBottom: 5,
                                    paddingLeft: 30
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-around',
                                    alignItems: 'center',
                                    height: 50
                                }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}
                                    >
                                        <Image
                                            source={IMG.account}
                                        />
                                        <Text style={{
                                            fontSize: 16,
                                            marginLeft: 20,
                                            color: '#343434'
                                        }}
                                        >
                                            我的用户
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={
                                    () => {
                                        this.props.navigation.navigate(
                                            'MyAccount', {
                                                show: true
                                            }
                                        );
                                    }}
                                style={{
                                    backgroundColor: '#fff',
                                    borderBottomColor: '#cccccc',
                                    borderBottomWidth: 0.5,
                                    width: '100%',
                                    marginBottom: 5,
                                    paddingLeft: 30
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    // justifyContent: 'space-around',
                                    alignItems: 'center',
                                    height: 50
                                }}
                                >
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                    }}
                                    >
                                        <Image
                                            source={IMG.coin}
                                        />
                                        <Text style={{
                                            fontSize: 16,
                                            marginLeft: 20,
                                            color: '#343434'
                                        }}
                                        >
                                            账户中心
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            flex: 2,
                        }}
                        >
                            <Image
                                source={IMG.b1}
                                style={{
                                    width: '100%',
                                    height: 65
                                }}
                            />
                        </View>
                    </View>
                    {/* <View style={HomeStyles.topContainer}> */}
                    {/* <View style={HomeStyles.topPerson}> */}

                    {/* </View> */}
                    {/* </View> */}
                    <Animated.View style={[HomeStyles.position2, { left: this.state.left }]}>
                        <ScrollView style={{ backgroundColor: '#fff', flex: 1 }}>

                            <View style={HomeStyles.scrollContainer}>
                                <View style={HomeStyles.noticeCon}>
                                    <TouchableOpacity
                                        style={HomeStyles.noticeIcon}
                                        onPress={
                                            () => {
                                                this.handleDirm();
                                            }}
                                    >
                                        <Icons
                                            name="md-person"
                                            size={25}
                                            color="#fff"
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={HomeStyles.noticeContent}
                                        onPress={
                                            () => {
                                                this.props.navigation.navigate(
                                                    'Login'
                                                );
                                            }}
                                    >
                                        <Text style={{
                                            color: '#FFF',
                                            fontSize: 18,
                                        }}
                                        >
                                            登录锦鲤期货
                                        </Text>
                                    </TouchableOpacity>
                                    <View onPress={() => {}} style={HomeStyles.noticeMore} />
                                </View>
                                <View style={HomeStyles.MsgContainer}>
                                    <TouchableOpacity
                                        style={HomeStyles.MsgBox}
                                        onPress={
                                            () => {
                                                this.props.navigation.navigate(
                                                    'Server'
                                                );
                                            }}
                                    >
                                        <Image
                                            source={IMG.IMG1}
                                            style={HomeStyles.IMGPNG}
                                        />
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: 17
                                        }}
                                        >
                                            活动中心
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={HomeStyles.MsgBox}
                                        onPress={() => {
                                            if (params.length && data.length) {
                                                this.props.navigation.navigate(
                                                    'News', { params, data }
                                                );
                                            }
                                        }}
                                    >
                                        <Image
                                            source={IMG.IMG2}
                                            style={HomeStyles.IMGPNG}
                                        />
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: 17
                                        }}
                                        >
                                            财经日历
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={HomeStyles.MsgBox}
                                        onPress={
                                            () => {
                                                this.props.navigation.navigate(
                                                    'Find'
                                                );
                                            }}
                                    >
                                        <Image
                                            source={IMG.IMG3}
                                            style={HomeStyles.IMGPNG}
                                        />
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: 17
                                        }}
                                        >
                                            平台公告
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={HomeStyles.MsgBox}
                                        onPress={
                                            () => {
                                                this.props.navigation.navigate(
                                                    'Server'
                                                );
                                            }}
                                    >
                                        <Image
                                            source={IMG.IMG4}
                                            style={HomeStyles.IMGPNG}
                                        />
                                        <Text style={{
                                            color: '#fff',
                                            fontSize: 17
                                        }}
                                        >
                                            发现
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={HomeStyles.statusBarContainer}>
                                    {/* <StatusBar */}
                                    {/* animated */}
                                    {/* hidden={false} */}
                                    {/* backgroundColor="green" */}
                                    {/* barStyle="light-content" */}
                                    {/* translucent */}
                                    {/* /> */}
                                    <View style={HomeStyles.swiperContainer}>
                                        <Image
                                            source={IMG.ban}
                                            style={HomeStyles.bannerImg}
                                        />
                                    </View>
                                </View>
                            </View>
                            {/* 开市，关市 */}
                            <View style={HomeStyles.positionContainer}>
                                <Position params={params} arr={data1} navigation={navigation} />
                            </View>

                            <View style={HomeStyles.noCon}>
                                <View style={HomeStyles.noticCon}>
                                    <View style={HomeStyles.noticeIcon}>
                                        <Image source={IMG.c1} />
                                    </View>
                                    <View style={HomeStyles.ncContent}>
                                        {arr.length ? (
                                            <Swiper
                                                autoplay
                                                containerStyle={{ width: '80%' }}
                                                height={50}
                                                removeClippedSubviews={false}
                                                showsPagination={false}
                                                style={{
                                                    alignItems: 'center',
                                                    justifyContent: 'space-around',
                                                    height: 50,
                                                }}
                                                autoplayTimeout={3}
                                            >
                                                { arr.map((item, idx) => (
                                                    <Text
                                                        key={idx}
                                                        style={{
                                                            color: '#939393',
                                                            fontSize: 17,
                                                            height: 50,
                                                            lineHeight: 46
                                                        }}
                                                    >
                                                        {item.title}
                                                    </Text>
                                                ))}
                                            </Swiper>
                                        ) : (
                                            <Text style={{
                                                color: '#939393',
                                                fontSize: 18,
                                            }}
                                            >
                                                暂无公告
                                            </Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={{
                                alignItems: 'center',
                                justifyContent: 'space-around',
                                height: 50,
                                flexDirection: 'row',
                                paddingHorizontal: 10
                            }}
                            >
                                <View style={{
                                    flex: 1
                                }}
                                >
                                    <Image source={IMG.c2} />
                                </View>
                                <View style={{
                                    flex: 5
                                }}
                                >
                                    <Text>
                                        【汉能与华夏银行签订战略合作协议】昨日，
                                        汉能移动能源控股集团与华夏银行签订银.....
                                    </Text>
                                </View>
                            </View>
                            {this.renderRow()}
                            <View style={HomeStyles.bottomContainer}>
                                <Text style={{
                                    // paddingVertical: 3,
                                    lineHeight: 20
                                }}
                                >
                                    交易由纽约商业、商品交易所及香港交易所等实盘对接。
                                </Text>
                                <Text style={{
                                    lineHeight: 20
                                }}
                                >
                                    本产品属于高风险、高收益投资品种；投资者应具有较高的风险识别能力、资金实力与风险承受能力。
                                </Text>
                            </View>
                        </ScrollView>
                    </Animated.View>
                    <View style={{
                        height,
                        width: '30%',
                        position: 'absolute',
                        left: width * 0.7,
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: this.state.isModal ? 'flex' : 'none',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)'
                    }}
                    >
                        {/* 关闭页面 */}
                        <TouchableOpacity
                            style={{
                                height,
                                width: '100%',
                            }}
                            onPress={() => {
                                this.setState({
                                    isModal: false
                                });
                                Animated.timing(// 使用timin过度动画
                                    this.state.left, // 要改变的动画对象
                                    {
                                        toValue: 0, // 动画结束值
                                        duration: 300, // 动画运行时
                                        easing: Easing.linear
                                    }
                                ).start();// 动画开始执行
                            }}
                        >
                            <Text />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeBody>
        );
    }
}

const HomeStyles = StyleSheet.create({
    root: {
        flex: 1,
        width,
        height,
        backgroundColor: '#ffffff',
    },
    AllCon: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        height,
        width: 1.7 * width,
        // #f9f8f5
        // left: width * 0.2,
        backgroundColor: '#ffffff',
        flex: 1,
        marginBottom: 50
    },
    position1: {
        width: width * 0.7,
        backgroundColor: '#ffffff',
        position: 'absolute',
        height,
        justifyContent: 'space-around'
    },
    position2: {
        width,
        height,
        position: 'absolute',
        left: width * 0.7,
        flex: 1,
        marginBottom: 50
    },
    topContainer: {
        backgroundColor: '#D31926'
    },
    topPerson: {

    },
    statusBarContainer: {
        // alignItems: 'center'
    },
    mainContainer: {
    },
    swiperContainer: {
        marginTop: 10,
        height: 150,
        width
    },
    bannerImg: {
        height: 200,
        width,
    },
    scrollContainer: {
        backgroundColor: '#D31926',
        paddingTop: 20,
    },
    noticeCon: {
        width,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    noticeIcon: {
        flex: 1.2,
        alignItems: 'center'
    },
    noticeContent: {
        flex: 6,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    noticeMore: {
        flex: 1.8,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    MsgContainer: {
        // 资讯盒子
        marginTop: 10,
        width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: '#ffffff',
    },
    MsgBox: {
        // 单个盒子
        // backgroundColor: '#ffffff',
        marginHorizontal: 5,
        height: 85,
        flex: 1,
        borderRadius: 4,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    IMGPNG: {
        width: 30,
        height: 30
    },
    bottomContainer: {
        width,
        // alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: '#F4F4F4',
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 20,
        marginBottom: 50
    },
    noCon: {
        // backgroundColor: '#D31926',
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 10
    },
    ncContent: {
        flex: 8,
        height: 50,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    noticCon: {
        width: width * 0.95,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#ededed',
        borderRadius: 25
    },
    weekBar: {
        height: 135,
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        marginHorizontal: 10,
        borderColor: '#e1e1e1'
    },
    oilContainer: {
        width,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 18
    },
    oilItemView: {
        marginTop: 10,
        width: '60%',
        // alignContent: 'center',
    },
    oilImageView: {
        height: 95,
        width: 135,
    },
    oilText1: {
        fontWeight: 'bold',
        fontSize: 17
    },
    oilTxCont: {
        flexDirection: 'row'
    },
    oilText2: {
        fontSize: 15,
        marginTop: 10,
        color: '#999'
    },
    oilText3: {
        fontSize: 15,
        marginTop: 10,
        color: '#999',
        marginLeft: 50
    },
    LoadingCon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default HomePage;
