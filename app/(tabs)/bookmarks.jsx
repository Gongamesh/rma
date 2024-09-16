import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Placeholder lista knjiga koje su dodane u favorite
const favoriteBooks = [
  {
    id: 1,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    status: "Want to Read", // Početni status
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "Reading", // Početni status
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    status: "Already Read", // Početni status
  },
  {
    id: 4,
    title: "Animal Farm",
    author: "George Orwell",
    status: "Already Read", // Početni status
  },
];

const statuses = ["Already Read", "Reading", "Want to Read"];

const BookmarksScreen = () => {
  const [books, setBooks] = useState(favoriteBooks);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Funkcija za promjenu statusa knjige
  const updateBookStatus = (bookId, newStatus) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, status: newStatus } : book
      )
    );
    setModalVisible(false);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-lightGray">
      <ScrollView className="p-4">
        <Text className="text-dark text-2xl font-bold mb-3 mt-4 text-center">Bookmarks</Text>

        {books.length === 0 ? (
          <Text className="text-dark text-center">You have no favorites yet.</Text>
        ) : (
          books.map((book) => (
            <View key={book.id} className="bg-white p-4 mb-4 rounded-xl shadow-md">
              <Text className="text-primary font-semibold text-xl">{book.title}</Text>
              <Text className="text-dark text-base">Author: {book.author}</Text>
              <Text className="text-dark text-base mt-2">Status: {book.status}</Text>

              {/* Dugme za odabir statusa */}
              <TouchableOpacity
                className="bg-accent mt-4 p-2 rounded-lg flex-row justify-center items-center"
                onPress={() => openModal(book)}
              >
                <FontAwesome name="edit" size={20} color="white" />
                <Text className="text-white ml-2">Change Status</Text>
              </TouchableOpacity>

              {/* Ikona srce kao indikacija da je u favoritima */}
              <TouchableOpacity className="bg-accent mt-4 p-2 rounded-lg flex-row justify-center items-center">
                <FontAwesome name="heart" size={20} color="red" />
                <Text className="text-white ml-2">In Favorites</Text>
              </TouchableOpacity>
            </View>
          ))
        )}

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

              {/* Dugme za zatvaranje modala */}
              <TouchableOpacity
                className="bg-dark p-2 rounded-lg mt-4"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookmarksScreen;
