import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_DEFAULT, Marker } from 'react-native-maps';


const coords = [[19.357633, -99.273455], [19.361445, -99.278597], [19.365305, -99.264662], [19.417342, -99.148454]];


export default class MyMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapRegion: null,
            lastRegion: null,
            delta: null,
            markers: []
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
            region: region
        });
    }

    onRegionCompleteChange(){
        let markers = [];
        let delta = this.state.region.latitudeDelta;
        if(delta <= 0.05){
            for (let i = 0; i < coords.length; i++) {
                markers.push(
                    <Marker
                        key={i}
                        coordinate={{
                            latitude: coords[i][0],
                            longitude: coords[i][1],
                        }}>
                    </Marker>
                )
            }
        }
        this.setState({
            markers: markers
        });
    }

    render() {
        return (
            <View style={styles.container} >
                <MapView
                    style={styles.map}
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
    }
});