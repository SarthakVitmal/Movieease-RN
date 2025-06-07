import {View, TextInput, Image} from 'react-native';
import React from 'react'
import {icons} from '@/constants/icons'

interface Props {
    placeholder: string
    onPress?: () => void
    value?: string
    onChangeText?: (text:string) => void
}

const SearchBar = ({placeholder,onPress,value,onChangeText}:Props) => {
    return (
        <View className={"flex-row items-center bg-dark-200 rounded-full px-5 py-4"}>
            <Image source={icons.search} className={"text-white"} resizeMode="contain" tintColor={"#ab8bff"} />
            <TextInput onPress={onPress} placeholder={placeholder} value={value} onChangeText={onChangeText} placeholderTextColor={"#a8b5db"}  className={"flex ml-2 text-white"} />
        </View>
    )
}

export default SearchBar;