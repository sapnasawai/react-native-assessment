import { View} from 'react-native'
import React from 'react'
import { SERVER_SOURCE, TEST_SOURCE } from '../Utils/Constants'
import { CheckBox } from "react-native-elements";

const DataSource = ({selectedSource, setSelectedSource, setInput, setFilteredData}) => {
const onPressTest = () => {
    setSelectedSource(TEST_SOURCE)
    setInput("")
    setFilteredData("")
}
const onPressServer = () => {
    setSelectedSource(SERVER_SOURCE)
    setInput("")
    setFilteredData('')
}
  return (
    <View style={{ marginHorizontal: 20, marginVertical:40 }}>
        <CheckBox
          title={TEST_SOURCE}
          checked={selectedSource === TEST_SOURCE}
          onPress={onPressTest}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="blue"
        />
        <CheckBox
          title={SERVER_SOURCE}
          checked={selectedSource === SERVER_SOURCE}
          onPress={onPressServer}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor="blue"
        />
      </View>
  )
}

export default DataSource