import React, {Component} from 'react';
import {
    View,
    ScrollView, 
    KeyboardAvoidingView,
    Text,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const Email = t.subtype(t.Str, (email) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
});

const Phone = t.subtype(t.Str, (phone) => {
    const reg = /([+]?\d{1,2}[.-\s]?)?(\d{3}[.-]?){2}\d{4}$/;
    return reg.test(phone);
});

export default class MyForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            info:''
        };
    }

    onChange = (value) =>{
        this.setState({ value });
    }

    clearForm() {
        this.setState({
            value: null
        });
    }

    onPress = () => {
        const value = this._form.getValue();
        if(value){
            console.log(value.calle_y_número);
            this.setState({
                info: value
            })
            this.clearForm();
        }
    }

    render(){
        const User = t.struct({
            nombre: t.String,
            telefono: Phone,
            email: Email,
            empresa: t.String,
            calle_y_número: t.String,
            comentarios: t.maybe(t.String)
        });

        const options = {
            fields:{
                telefono: {
                    error: 'Inserta un teléfono válido'
                },
                email: {
                    error: 'Inserta un email válido'
                },
                comentarios: {
                    multiline: true,
                    stylesheet: {
                        ...Form.stylesheet,
                        textbox: {
                            ...Form.stylesheet.textbox,
                            normal: {
                                ...Form.stylesheet.textbox.normal,
                                height: 100
                            }
                        }
                    }
                }
            }
        }

        return(
            <View style={styles.container}>
                <ScrollView>
                    <KeyboardAvoidingView 
                        style={{ flex:1 }}
                        keyboardVerticalOffset={100} 
                        behavior={"padding"}>
                        <Form 
                            ref={c => this._form = c}
                            type={User}
                            options={options}
                            onChange={this.onChange}
                            value={this.state.value}
                            />
                        <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#d1eefa'>
                            <Text style={styles.buttonText}>Enviar</Text>
                        </TouchableHighlight>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
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