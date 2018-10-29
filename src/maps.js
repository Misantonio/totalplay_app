import React, { Component } from 'react';
import { StyleSheet, View, Dimensions, Text, Image } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';


const coords = [[19.357633, -99.273455], [19.361445, -99.278597], [19.365305, -99.264662], [19.417342, -99.148454]];
const info = [
    'Zona: Santa Fe. \n Hub No. 2031',
    'Zona: Santa Fe. \n Hub No. 2231',
    'Zona: Santa Fe. \n Hub No. 2041',
    'Zona: Doctores. \n Hub No. 3011'
];
const width = Dimensions.get('window').width;

export default class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            lastRegion: null,
            delta: null,
            markers: [],
            markerPressed: null,
            pressed: false
        }
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition((position) => {
            let region = {
                latitude: position.coords.latitude,
                longitude:position.coords.longitude,
                latitudeDelta:  0.02,
                longitudeDelta: 0.02
            }
            this.setState({
                mapRegion: region,
                region: region
            });
        })
    } 

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }

    onRegionChange(region) {
        this.setState({
            region: region,
            moving: true
        });
    }

    onPressMarker = (args) => {
        let id = args.nativeEvent.id;
        let pressed = id != this.state.markerPressed ? true : false;
        this.setState({
            pressed: pressed,
            markerPressed: id
        });
        this.setMarkers(!this.state.pressed, id);
    }

    setMarkers(pressed, markerPressed){
        let markers = [];
        let delta = this.state.region.latitudeDelta;
        if(delta <= 0.05){
            for (let i = 0; i < coords.length; i++) {
                if (markerPressed == i && pressed){
                    markers.push(
                        <Marker
                            tracksViewChanges={false}
                            identifier={String(i)}
                            onPress={this.onPressMarker}
                            key={Math.round(Math.random()*10000)}
                            coordinate={{
                                latitude: coords[i][0],
                                longitude: coords[i][1],
                            }}>
                            <View style={styles.rectangle}>
                                <Text style={styles.mapsInfo}>{info[markerPressed]}</Text>
                            </View>
                            <View style={styles.triangle}></View>
                        </Marker>
                    )
                } else {
                    markers.push(
                        <Marker
                            identifier={String(i)}
                            onPress={this.onPressMarker}
                            key={Math.round(Math.random()*10000)}
                            coordinate={{
                                latitude: coords[i][0],
                                longitude: coords[i][1],
                            }}>
                        </Marker>
                    )
                }
            }
        }
        this.setState({
            markers: markers
        })
    }

    onRegionCompleteChange(){
        this.setMarkers(this.state.pressed, this.state.markerPressed);
    }

    render() {
        return (
            <View style={styles.container} >
                <MapView
                    style={[styles.map, { width: this.state.width }]}
                    onMapReady={() => this.setState({ width: width - 1 })}
                    provider={PROVIDER_DEFAULT}
                    initialRegion={this.state.mapRegion}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    onRegionChangeComplete={this.onRegionCompleteChange.bind(this)}
                    onRegionChange={this.onRegionChange.bind(this)}>
                    {this.state.markers}
                </MapView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: "center"
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
    },
    rectangle: {
        width: 100,
        height: 35,
        backgroundColor: 'white',
        borderRadius: 10,
        borderColor: 'red',
        borderWidth: 2,
        alignContent: 'center'
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 50,
        borderRightWidth: 50,
        borderBottomWidth: 20,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'red',
        transform: [{
            rotate: '180deg'
        }]
    },
    mapsInfo: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 10,
        marginBottom: 5,
    }
});