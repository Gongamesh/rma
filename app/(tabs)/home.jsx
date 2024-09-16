import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const books = [
  {
    id: 1,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    releaseDate: "July 16, 1951",
    description: "A story about the experiences of a young boy named Holden Caulfield.",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    releaseDate: "July 11, 1960",
    description: "A novel about racial injustice in the Deep South.",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    releaseDate: "June 8, 1949",
    description: "A dystopian novel set in a totalitarian society under constant surveillance.",
  },
  {
    id: 4,
    title: "Animal Farm",
    author: "George Orwell",
    releaseDate: "June 8, 1949",
    description: "A dystopian novel set in a totalitarian society under constant surveillance.",
  },
];

const HomeScreen = () => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (bookId) => {
    setFavorites((prev) => [...prev, bookId]);
  };

  return (
    <SafeAreaView className="flex-1 bg-lightGray">
      <ScrollView className="p-4">
        <Text className="text-dark text-2xl font-bold mb-3 mt-4 text-center">Book List</Text>

        {books.map((book) => (
          <View key={book.id} className="bg-white p-4 mb-4 rounded-xl shadow-md">
            <Text className="text-primary font-semibold text-xl">{book.title}</Text>
            <Text className="text-dark text-base">Author: {book.author}</Text>
            <Text className="text-dark text-sm">Published: {book.releaseDate}</Text>
            <Text className="text-dark text-sm mt-2">{book.description}</Text>

            <TouchableOpacity
              className="bg-accent mt-4 p-2 rounded-lg flex-row justify-center items-center"
              onPress={() => addToFavorites(book.id)}
            >
              <FontAwesome name="heart" size={20} color={favorites.includes(book.id) ? "red" : "white"} />
              <Text className="text-white ml-2">
                {favorites.includes(book.id) ? "Added to Favorites" : "Add to Favorites"}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
