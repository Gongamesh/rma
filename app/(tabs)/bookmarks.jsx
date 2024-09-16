import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Alert, RefreshControl, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

const statuses = ["Already Read", "Reading", "To Read"];

const BookmarksScreen = () => {
  const [books, setBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchUserData = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) throw error;

      if (session) {
        return session.user.id;
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      Alert.alert('Fetch User Error', error.message);
      return null;
    }
  };

  const fetchBooks = async () => {
    try {
      const userId = await fetchUserData();
      if (!userId) return;

      const { data, error } = await supabase
        .from('userBooks')
        .select(`
          *,
          books (
            id,
            title,
            author,
            published_date,
            genre
          )
        `)
        .eq('user_id', userId);

      if (error) throw error;

      const formattedData = data.map(item => ({
        id: item.books?.id,
        title: item.books?.title,
        author: item.books?.author,
        published_date: item.books?.published_date,
        status: item.status
      }));

      const validBooks = formattedData.filter(book => book.id);

      setBooks(validBooks);
    } catch (error) {
      Alert.alert('Error fetching books', error.message);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await fetchBooks();
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, []);

  const removeFromFavorites = async (bookId) => {
    try {
      const userId = await fetchUserData();
      if (!userId) return;

      const { error } = await supabase
        .from('userBooks')
        .delete()
        .eq('book_id', bookId)
        .eq('user_id', userId);

      if (error) throw error;

      setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));

      Alert.alert('Success', 'Book removed from favorites successfully');
    } catch (error) {
      Alert.alert('Error removing book from favorites', error.message);
    }
  };

  const updateBookStatus = async (bookId, newStatus) => {
    try {
      const userId = await fetchUserData();
      if (!userId) return;

      const { error } = await supabase
        .from('userBooks')
        .update({ status: newStatus })
        .eq('book_id', bookId)
        .eq('user_id', userId);

      if (error) throw error;

      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.id === bookId ? { ...book, status: newStatus } : book
        )
      );

      setModalVisible(false);
      Alert.alert('Success', 'Book status updated successfully');
    } catch (error) {
      Alert.alert('Error updating book status', error.message);
    }
  };

  const renderItem = ({ item }) => (
    <View key={item.id} className="bg-white p-4 mb-4 rounded-xl shadow-md">
      <Text className="text-primary font-semibold text-xl">{item.title}</Text>
      <Text className="text-dark text-base">Author: {item.author}</Text>
      <Text className="text-dark text-base mt-2">Status: {item.status}</Text>

      <TouchableOpacity
        className="bg-accent mt-4 p-2 rounded-lg flex-row justify-center items-center"
        onPress={() => {
          setSelectedBook(item);
          setModalVisible(true);
        }}
      >
        <FontAwesome name="edit" size={20} color="white" />
        <Text className="text-white ml-2">Change Status</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="bg-accent mt-4 p-2 rounded-lg flex-row justify-center items-center"
        onPress={() => removeFromFavorites(item.id)}
      >
        <FontAwesome name="trash" size={20} color="white" />
        <Text className="text-white ml-2">Remove from Favorites</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-lightGray">
      <View className="p-4">
        <Text className="text-dark text-2xl font-bold mt-4 text-center">Bookmarks</Text>
      </View>
      <FlatList
        data={books}
        renderItem={renderItem}
        keyExtractor={(item) => item.id?.toString() || item.id}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center">
            <Text className="text-dark text-lg">You have no favorites yet.</Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      {/* Modal za promjenu statusa */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-primary bg-opacity-50">
          <View className="bg-white p-4 rounded-lg w-3/4">
            <Text className="text-dark text-xl font-bold mb-4">Change Status</Text>
            {statuses.map((status) => (
              <TouchableOpacity
                key={status}
                className="p-2 rounded-lg mb-2 bg-lightGray"
                onPress={() => updateBookStatus(selectedBook.id, status)}
              >
                <Text className="text-dark text-base">{status}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              className="bg-dark p-2 rounded-lg mt-4"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BookmarksScreen;
