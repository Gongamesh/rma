import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import {useState} from 'react'

const FormField = ({ title, value, placeholder, handleChangeText, otherStyles, ...props }) => {
    const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-lightGray">{title}</Text>

      <View className="flex-row w-full h-16 px-4 bg-lightGray rounded-2xl items-center border-2 border-lightGray focus:border-accent">
        <TextInput 
            className="flex-1 text-dark font-semibold text-base"
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#2C3E50"
            onChange={handleChangeText}
            secureTextEntry={title === 'Password' && !showPassword}
        />

      </View>
    </View>
  )
}

export default FormField