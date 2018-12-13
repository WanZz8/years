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
    Platform
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
        };
    }

    componentDidMount() {
        this.props.NoticeStore.getNoticeContent();
    }

    handleSwitch(key) {
        if (this.state.selectedIndex === key) {
            this.setState({
                selectedIndex: -1
            });
        } else {
            this.setState({
                selectedIndex: key
            });
        }
    }

    render() {
        return (
            <SafeAreaView style={AllOptionalStyles.root}>
                <ScrollView>
                    <View style={AllOptionalStyles.mainContainer}>
                        <Image source={IMG} />
                        <View style={{
                            marginTop: 20
                        }}
                        >
                            <Text style={{
                                fontSize: 18
                            }}
                            >
                                您还有添加自选哦
                            </Text>
                            <Text style={{
                                marginTop: 10,
                                fontSize: 18,
                                paddingHorizontal: 25
                            }}
                            >
                                快去添加吧
                            </Text>
                        </View>
                        <View
                            style={{
                                width,
                                alignItems: 'center',
                                height: 40,
                                marginTop: 20
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    width: '55%',
                                    backgroundColor: '#F8260F',
                                    alignItems: 'center',
                                    justifyContent: 'space-around',
                                    height: 40,
                                    borderRadius: 30
                                }}
                                // onPress={this.login}
                            >
                                <Text style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontWeight: 'bold',
                                }}
                                >
                                    添加自选
                                </Text>
                            </TouchableOpacity>
                        </View>
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
});

export default AllOptional;
