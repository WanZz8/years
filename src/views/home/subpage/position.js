// 独立行情模块
import React, { Component } from 'react';
import {
    Alert,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableHighlight
} from 'react-native';
import { observer, inject } from 'mobx-react';
import Swiper from 'react-native-swiper';
import Icons from 'react-native-vector-icons/Ionicons';
import LoadingView from '../../../common/LoadingView';

const width = Dimensions.get('window').width; // 全屏宽高
const height = Dimensions.get('window').height; // 全屏宽高
const hot = require('../../../img/home/hot.png');

const IMG = {
    person: require('../../../img/home/a2.png'),
};

const RAISE = '#E84209';
const FALL = '#009900';

@inject('MainStore')
@observer
class Position extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRest: false,
            params: '',
            arr: []
        };
        this.renderTrade = this.renderTrade.bind(this);
    }

    componentDidMount() {
        // console.log(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (nextProps) {
            this.setState({
                params: nextProps.params,
                arr: nextProps.arr
            });
        }
    }

    componentDidUpdate() {
        if (this.state.params) {
            // console.log(this.state.params);
            // console.log(this.state.arr);
            // setTimeout(() => { console.log(this.state.arr); }, 6000);
            this.props.MainStore.getTrade(this.state.params);
        }
    }

    handleActive(status) {
        this.setState({
            isRest: status
        });
    }

    renderLoading = () => <LoadingView />;

    renderTrade() {
        // let idx1 = 0;
        // let idx3 = 0;
        // let content = (
        //     <Swiper
        //         activeDot={<View style={PositionStyles.activeDot} />}
        //         dot={<View style={PositionStyles.dot} />}
        //         paginationStyle={PositionStyles.pagination}
        //         loop={false}
        //     >
        //         {this.state.arr.map((item, idx) => {
        //             const priceColor = item.isUp
        //                 ? RAISE
        //                 : FALL;
        //             return (
        //                 <TouchableOpacity
        //                     key={idx}
        //                     style={[PositionStyles.positionContainer, { backgroundColor: '#fff' }]}
        //                     onPress={
        //                         () => {
        //                             this.props.navigation.navigate(
        //                                 'Trede', { data: item }
        //                             );
        //                         }}
        //                 >
        //                     <View style={[{
        //                         flexDirection: 'row',
        //                         alignItems: 'center',
        //                         justifyContent: 'space-around',
        //                         flex: 1
        //                     }]}
        //                     >
        //                         <Text style={{
        //                             color: '#000',
        //                             fontSize: 14,
        //                             textAlign: 'left',
        //                             fontWeight: 'bold'
        //                         }}
        //                         >
        //                             {item.name}
        //                         </Text>
        //                         {this.props.MainStore.isHot(item.code) ? (
        //                             <View style={{ flex: 1 }}>
        //                                 <Image
        //                                     source={hot}
        //                                     style={{
        //                                         width: 12,
        //                                         height: 13,
        //                                     }}
        //                                 />
        //                             </View>
        //                         ) : []}
        //                         {this.props.MainStore.isNew(item.code) ? (
        //                             <View style={{
        //                                 left: 5,
        //                                 width: 50,
        //                                 backgroundColor: '#00b38f',
        //                                 alignItems: 'center',
        //                                 borderRadius: 3
        //                             }}
        //                             >
        //                                 <Text style={{
        //                                     color: '#fff'
        //                                 }}
        //                                 >
        //                                         NEW
        //                                 </Text>
        //                             </View>
        //                         ) : []}
        //                     </View>
        //                     <View style={{
        //                         flex: 2,
        //                         alignItems: 'center',
        //                         justifyContent: 'space-around',
        //                     }}
        //                     >
        //                         <Text style={{
        //                             textAlign: 'center',
        //                             color: priceColor,
        //                             fontSize: 17,
        //                             fontWeight: 'bold'
        //                         }}
        //                         >
        //                             {item.price}
        //                         </Text>
        //                     </View>
        //                     <View style={{
        //                         flex: 1,
        //                         alignItems: 'center',
        //                         justifyContent: 'space-around'
        //                     }}
        //                     >
        //                         <View style={{
        //                             backgroundColor: item.isUp ? '#E13628' : '#00b38f',
        //                             width: '80%',
        //                             borderWidth: 1,
        //                             borderRadius: 4,
        //                             borderColor: item.isUp ? RAISE : FALL,
        //                         }}
        //                         >
        //                             <Text style={{
        //                                 textAlign: 'center',
        //                                 color: '#fff',
        //                                 fontSize: 18,
        //                                 fontWeight: 'bold',
        //                                 height: 30,
        //                                 lineHeight: 30,
        //                             }}
        //                             >
        //                                 {item.rate}
        //                             </Text>
        //                         </View>
        //                     </View>
        //                 </TouchableOpacity>
        //             );
        //         })}
        //     </Swiper>
        // );
        //
        // return content;
    }

    Tardeslice() {
        let result = [];
        for (let i = 0, len = this.state.arr.length; i < len; i += 3) {
            result.push(this.state.arr.slice(i, i + 3));
        }
        const len = result.length;
        if (len !== 0 && result[len - 1].length < 3) {
            do {
                result[len - 1].push({});
            } while (result[len - 1].length < 3);
        }
        return result;
    }

    render() {
        const list = this.Tardeslice();

        return (
            <View style={PositionStyles.root}>
                <View style={PositionStyles.titleContainer}>
                    <View style={PositionStyles.txtContainer}>
                        <Image
                            source={IMG.person}
                            style={{
                                width: 25,
                                height: 25,
                                alignItems: 'center',
                                marginLeft: 10
                            }}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.handleActive(false);
                            }}
                            style={{ flex: 2, alignItems: 'flex-start', marginLeft: 10 }}
                        >
                            <Text style={this.state.isRest ? PositionStyles.active : []}>
                                热门期货
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={PositionStyles.noContainer} />
                </View>
                <Swiper
                    dot={<View style={PositionStyles.dot} />}
                    activeDot={<View style={PositionStyles.activeDot} />}
                    paginationStyle={PositionStyles.pagination}
                    loop={false}
                    style={{
                        width,
                        height: 130
                    }}
                    // autoplay
                    // autoplayTimeout={3}
                >
                    {
                        list.map((item, ss) => (
                            <View style={PositionStyles.cellRoot} key={ss}>
                                {
                                    item.map(({
                                        code, name, price, rate, isUp
                                    }, idx) => {
                                        if (name !== undefined) {
                                            let priceColor = price === null
                                                ? '#101010' : (isUp ? RAISE : FALL);
                                            let rateColor = rate === null
                                                ? '#101010' : (isUp ? RAISE : FALL);

                                            return (
                                                <TouchableHighlight
                                                    style={[PositionStyles.touchable, { height: 80 }]}
                                                    onPress={
                                                        () => {
                                                            this.props.navigation.navigate(
                                                                'Trede', { data: code }
                                                            );
                                                        }}
                                                    activeOpacity={1}
                                                    key={idx}
                                                    underlayColor="#e6e6e6"
                                                >
                                                    <View>
                                                        <View style={{
                                                            justifyContent: 'center',
                                                            flexDirection: 'row'
                                                        }}
                                                        >
                                                            <Text style={PositionStyles.name}>
                                                                {name}
                                                            </Text>
                                                            {this.props.MainStore.isHot(code) ? (
                                                                <View style={{
                                                                    marginBottom: 5,
                                                                    marginLeft: 10
                                                                }}
                                                                >
                                                                    <Image
                                                                        source={hot}
                                                                        style={{
                                                                            width: 12,
                                                                            height: 13,
                                                                        }}
                                                                    />
                                                                </View>
                                                            ) : []}
                                                            {this.props.MainStore.isNew(code) ? (
                                                                <View style={{
                                                                    left: 5,
                                                                    width: 50,
                                                                    backgroundColor: '#00b38f',
                                                                    alignItems: 'center',
                                                                    borderRadius: 3
                                                                }}
                                                                >
                                                                    <Text style={{
                                                                        color: '#fff'
                                                                    }}
                                                                    >
                                                                        NEW
                                                                    </Text>
                                                                </View>
                                                            ) : []}
                                                        </View>
                                                        <Text style={[{ color: priceColor },
                                                            PositionStyles.priceAndPercentText]}
                                                        >
                                                            {price !== null ? price : '-'}
                                                        </Text>
                                                        <Text style={[PositionStyles.priceAndPercentText,
                                                            { color: rateColor, fontSize: 16 }]}
                                                        >
                                                            {rate !== null ? rate : '-'}
                                                        </Text>
                                                    </View>
                                                </TouchableHighlight>
                                            );
                                        }
                                        return (
                                            <View style={PositionStyles.emptyContent} key="kop" />
                                        );
                                    })
                                }
                            </View>
                        ))
                    }
                </Swiper>
            </View>
        );
    }
}

export default Position;

const PositionStyles = StyleSheet.create({
    root: {
        marginTop: 20,
    },
    titleContainer: {
        backgroundColor: '#ffffff',
        height: 45,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width,
        borderBottomWidth: 0.5,
        borderBottomColor: '#343434'
    },
    txtContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',

    },
    noContainer: {
        flex: 2,
    },
    active: {
        color: '#999'
    },
    bannerImg: {
        height: 150,
        width,
    },
    scrollContainer: {
        // backgroundColor: '#ffffff',
        width
    },
    noticeCon: {
        width,
        height: 50,
    },
    noticeIcon: {
        flex: 1,
        alignItems: 'center'
    },
    noticeContent: {
        flex: 6,
        height: 50
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
        backgroundColor: '#ffffff',
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
    positionContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        width,
        height: 150
    },
    bottomContainer: {
        width,
        // alignItems: 'center',
        justifyContent: 'space-around',
        // backgroundColor: '#F4F4F4',
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    dot: {
        backgroundColor: '#D8D8D8',
        width: 6,
        height: 6,
        borderRadius: 6,
        marginLeft: 2,
        marginRight: 2
    },
    activeDot: {
        backgroundColor: '#E84209',
        width: 13,
        height: 6,
        borderRadius: 6,
        marginLeft: 2,
        marginRight: 2
    },
    pagination: {
        bottom: 14
    },
    cellRoot: {
        flexDirection: 'row',
        width,
        justifyContent: 'space-around',
        alignContent: 'center',
        flexWrap: 'wrap'
    },
    touchable: {
        alignSelf: 'center',
        width: width / 3,
        justifyContent: 'center'
    },
    priceAndPercentText: {
        fontSize: 18,
        textAlign: 'center'
    },
    emptyContent: {
        alignSelf: 'center',
        width: width / 3
    },
    name: {
        color: '#6e6e6f',
        fontSize: 15,
        textAlign: 'center'
    },
});
