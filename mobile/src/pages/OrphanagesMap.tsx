import React, { useEffect, useState } from 'react';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import mapMarker from '../images/map-marker.png';
import { Text, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { styles } from '../styles/OrphanageMapStyles';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Orphanage {
    id: number,
    name: string;
    latitude: number;
    longitude: number;
}

export default function OrphanagesMap() {
    const navigation = useNavigation();

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    useFocusEffect(() => {
        api.get('/orphanages').then(response => {
            setOrphanages(response.data);
        })
    });

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id });
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: -21.113534,
                    longitude: -47.831222,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008
                }} >
                {orphanages.map(orphanage => {
                    return (
                        <Marker
                            key={orphanage.id}
                            icon={mapMarker}
                            calloutAnchor={{
                                x: 2.7,
                                y: 0.9
                            }}
                            coordinate={{
                                latitude: orphanage.latitude,
                                longitude: orphanage.longitude
                            }} >
                            <Callout tooltip onPress={
                                () => handleNavigateToOrphanageDetails(orphanage.id)
                            }>
                                <View style={styles.calloutContainer}>
                                    <Text style={styles.calloutText}>{orphanage.name}</Text>
                                </View>
                            </Callout>
                        </Marker>
                    );
                })}
            </MapView>

            <View style={styles.footer}>
                <Text style={styles.footerText}>{orphanages.length}
                    {orphanages.length > 1 ?
                        " orfanatos encontrados" :
                        " orfanato encontrado"}</Text>
                <RectButton
                    style={styles.createOrphanageButton}
                    onPress={handleNavigateToCreateOrphanage}>
                    <Feather name="plus" size={20} color="#FFF" />
                </RectButton>
            </View>
        </View>
    );
}

