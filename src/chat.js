import React, {Component} from 'react';
import {
    View, 
    ActivityIndicator, 
    StyleSheet
} from 'react-native';
import { 
    GiftedChat, 
    Send, 
    Bubble, 
    Day, 
    Composer
} from 'react-native-gifted-chat';
import MyForm from './form'


export default class Chat extends Component {
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            form: false
        };
        this.token = "";
    }

    componentDidMount(){
        return fetch('http://totalplay-mobile-chatbot.appspot.com/api/v1/auth/getToken',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'accountId': '0',
                    'referrer': '', 
                    'client_segment': '',
                    'client_name': ''
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.token = responseJson.account.token;
                this.setState({
                    isLoading: false,
                }, function(){

                });

            })
            .catch((error) =>{
                console.error(error);
            });
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: 1,
                    text: 'Hola, soy tu asistente personal de TotalPlay. ¿En qué te puedo ayudar?',
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: 'Totalplay',
                        avatar: 'https://image.winudf.com/v2/image/Y29tLlRvdGFsUGxheS50b3RhbHBsYXlfaWNvbl8xNTM5MzExNjc2XzAxOQ/icon.png?w=170&fakeurl=1&type=.png',
                    },
                },
            ],
        });
    }

    onSend(messages = []) {
        fetch('http://totalplay-mobile-chatbot.appspot.com/api/v1/message',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-ACCOUNT-ID': 0,
                    'X-APP-TOKEN': this.token,
                    'X-LOGGED-IN': false
                },
                body: JSON.stringify({
                    'message': messages['0']['text']
                })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    form: responseJson.context.ticket
                })
                let res = responseJson.response;
                res = res.replace(new RegExp('<(\s*\/?)[^>]+>','g'), '');
                res = res.replace(new RegExp('<\/(\s*\/?)[^>]+>','g'), '');
                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, this.onReceive(res))
                }));
            })
            .catch((error) =>{
                console.error(error);
            });
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }

    onReceive(text){
        return {
            _id: Math.round(Math.random()*1000000),
            text: text,
            createdAt: new Date(),
            user: {
                _id: 2,
                name: 'Totalplay',
                avatar: 'https://image.winudf.com/v2/image/Y29tLlRvdGFsUGxheS50b3RhbHBsYXlfaWNvbl8xNTM5MzExNjc2XzAxOQ/icon.png?w=170&fakeurl=1&type=.png',
            }
        }
    }


    renderDay(props) {
        return <Day 
            {...props} 
            textStyle={{color: '#595959'}}
            dateFormat='l'/>
    }

    renderComposer(props){
        return (
            <Composer 
                {...props}
                placeholder='Escribe tu mensaje...'
            />
        )
    }

    renderBubble(props) { 
        return ( 
            <Bubble 
                {...props} 
                textStyle={{
                    left: {
                        color: '#ffffff',
                    }
                }}
                wrapperStyle={{
                    left: {
                        backgroundColor: '#9900cc',
                    },
                    right: {
                        backgroundColor: '#ff9900'
                    }
                }} />
        )
    }

    renderSend(props) {
        return (
            <Send 
                {...props}
                label='Enviar'
                textStyle= {{ 
                    color: '#e600e6' 
                }} 
                >
            </Send>
        );
    }


    render() {
        if(this.state.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <ActivityIndicator style={{flex: 1, justifyContent: 'center', justifyContent: 'space-around'}} size={'large'}/>
                </View>
            )
        }

        if(this.state.form){
            return(
                <MyForm/>
            )
        }

        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={messages => this.onSend(messages)}
                user={{
                    _id: 1,
                }}
                renderSend={this.renderSend}
                renderBubble={this.renderBubble}
                renderDay={this.renderDay}
                renderComposer={this.renderComposer}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 0,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
  });