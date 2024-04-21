import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'black' }}>First Component</Text>
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ color: 'black' }}>Second Component</Text>
  </View>
);

export default function TournamentPage() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
  ]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={SceneMap({
        first: FirstRoute,
        second: SecondRoute,
      })}
      onIndexChange={setIndex}
      renderTabBar={(props) => (
        <View className='flex flex-row'>
          {props.navigationState.routes.map((route, i) => (
            <TouchableOpacity
            className='rounded-t-lg'
              style={{
                flex: 1,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: index === i ? 'gray' : 'white',
              }}
              key={route.key}
              onPress={() => setIndex(i)}
            >
              <Text style={{ color: index === i ? 'white' : 'black' }}>{route.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    />
  );
}
