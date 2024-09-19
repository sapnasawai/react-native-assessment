import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Text,
  TextInput,
  View,
} from "react-native";

import { MyData } from "../Utils/MyData";
import { DASH_SYMBOL, DATA_API, TEST_SOURCE } from "../Utils/Constants";
import DataSource from "./DataSource";
const { width: screenWidth } = Dimensions.get("window");

const Home = () => {
  const [selectedSource, setSelectedSource] = useState(TEST_SOURCE);
  const [serverData, setServerData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(DATA_API);
        const data = await response.json();
        setServerData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const data = selectedSource === TEST_SOURCE ? MyData : serverData;
  const handleInputChange = (text) => {
    setInput(text);
    const matches = data.filter(
      (item) => item[0].toLowerCase() === text.toLowerCase()
    );
    setFilteredData(matches);
  };
  const getAverage = () => {
    if (filteredData.length === 0) {
      return DASH_SYMBOL;
    }
    const total = filteredData.reduce((acc, item) => acc + item[1], 0);
    const average = total / filteredData.length;
    return average.toFixed(2);
  };
  return (
    <View style={{ flex: 1, marginVertical: 20 }}>
      <DataSource
        selectedSource={selectedSource}
        setSelectedSource={setSelectedSource}
        setInput={setInput}
        setFilteredData={setFilteredData}
      />
      {isLoading ? (
        <ActivityIndicator size={40} />
      ) : (
        <View style={{ flex: 1, alignItems: "center", marginTop: 60 }}>
          <TextInput
            style={{
              height: 40,
              borderColor: "gray",
              borderWidth: 1,
              marginBottom: 20,
              paddingHorizontal: 10,
              width: "50%",
            }}
            placeholder="Enter country name"
            value={input}
            onChangeText={handleInputChange}
          />
          <Text
            style={{
              marginBottom: 20,
              fontSize: 18,
              textAlign: "center",
            }}
          >
            The Average: {getAverage()}
          </Text>
          {input !== "" &&
            (filteredData.length !== 0 ? (
              <View
                style={{
                  width: (2 * screenWidth * getAverage()) / 300,
                  height: 10,
                  backgroundColor: "blue",
                }}
              />
            ) : (
              <Text style={{ color: "red", marginTop: 20 }}>
                No matching country found.
              </Text>
            ))}
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};

export default Home;
