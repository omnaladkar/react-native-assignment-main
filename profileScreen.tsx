import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';

const ProfileScreen = (): JSX.Element => {
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Software Developer',
  });

  const handleEdit = () => setEditing(!editing);

  const handleChange = (key: string, value: string) => {
    setProfile({ ...profile, [key]: value });
  };

  return (
    <View>
        <Text style={styles.text}>Name: {profile.name}</Text>
            <Text style={styles.text}>Email: {profile.email}</Text>
            <Text style={styles.text}>Bio: {profile.bio}</Text>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color:"black",
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: '80%',
    borderRadius: 5,
  },
});

export default ProfileScreen;
