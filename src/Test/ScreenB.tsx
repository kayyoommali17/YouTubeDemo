import React, {useCallback, useMemo, useState} from 'react';
import {FlatList, View} from 'react-native';
import Video from 'react-native-video';
interface Item {
  id: number;
  name: string;
  description: string;
  uri: string;
}

interface Props {
  selectedItem: Item;
  data: Item[];
}

const SecondScreen = ({selectedItem, data}: Props) => {
  const [videoUri, setVideoUri] = useState(selectedItem.uri);

  const renderItem = useCallback(
    ({item}: {item: Item}) => (
      <View>
        <View style={{height: 100, width: 100}}>
          <Video source={{uri: item.uri}} style={{height: 100, width: 100}} />
        </View>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item: Item) => item.id.toString(), []);

  const renderedData = useMemo(
    () => data.filter(item => item.id !== selectedItem.id),
    [data, selectedItem],
  );

  return (
    <View>
      <View style={{height: 200, width: '100%'}}>
        <Video source={{uri: videoUri}} style={{height: 200, width: '100%'}} />
      </View>
      <FlatList
        data={renderedData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default React.memo(SecondScreen);
