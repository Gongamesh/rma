import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Alert, RefreshControl } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

const HomeScreen = () => {
  const [books, setBooks] = useState([]);
  const [userId, setUserId] = useState(null);
  const [favoriteBookIds, setFavoriteBookIds] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      const { data, error } = await supabase.from('books').select('*');
      if (error) throw error;
      setBooks(data);
    } catch (error) {
      Alert.alert('Error fetching books', error.message);
    }
  };

  const fetchUserId = async () => {
    try {
      const { data: session, error } = await supabase.auth.getSession();
      if (error) throw error;
      const user = session.session?.user;
      if (user) {
        setUserId(user.id);
        await fetchFavoriteBookIds(user.id); // Fetch favorite book IDs for the user
      } else {
        Alert.alert('User not authenticated');
      }
    } catch (error) {
      Alert.alert('Error fetching user session', error.message);
    }
  };

  const fetchFavoriteBookIds = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('userBooks')
        .select('book_id')
        .eq('user_id', userId)
        .eq('favourite', true);
      if (error) throw error;
      const ids = data.map((item) => item.book_id);
      setFavoriteBookIds(ids);
    } catch (error) {
      Alert.alert('Error fetching favorite book IDs', error.message);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchBooks();
      if (userId) await fetchFavoriteBookIds(userId);
    } finally {
      setRefreshing(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBooks();
    fetchUserId();
  }, []);

  const addToFavorites = async (bookId) => {
    if (!userId) {
      Alert.alert('User not authenticated');
      return;
    }

    try {
      const { error } = await supabase
        .from('userBooks')
        .upsert([{ user_id: userId, book_id: bookId, favourite: true }]);

      if (error) throw error;
      Alert.alert('Success', 'Book added to favorites successfully');
      setFavoriteBookIds((prev) => [...prev, bookId]);
    } catch (error) {
      Alert.alert('Error adding book to favorites', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.id} className="bg-white p-4 mb-4 rounded-xl shadow-md">
      <Text className="text-primary font-semibold text-xl">{item.title}</Text>
      <Text className="text-dark text-base">Author: {item.author}</Text>
      <Text className="text-dark text-sm">Published: {item.published_date}</Text>
      <Text className="text-dark text-sm mt-2">{item.description}</Text>

      <TouchableOpacity
        className="bg-accent mt-4 p-2 rounded-lg flex-row justify-center items-center"
        onPress={() => addToFavorites(item.id)}
      >
        <FontAwesome name="heart" size={20} color="white" />
        <Text className="text-white ml-2">Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  );

  const filteredBooks = books.filter((book) => !favoriteBookIds.includes(book.id));

  return (
    <SafeAreaView className="flex-1 bg-lightGray pt-4">
      <View className>
        <Text className="text-dark text-2xl font-bold mt-4 text-center">Book List</Text>
      </View>
      <FlatList
        data={filteredBooks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-dark text-lg">No books available</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
