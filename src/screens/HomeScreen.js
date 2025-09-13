import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to DMSApp</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="View Details"
          onPress={() => navigation.navigate('Details')}
          color="#6200ee"
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go to Profile"
          onPress={() => navigation.navigate('Profile')}
          color="#6200ee"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
});

export default HomeScreen;