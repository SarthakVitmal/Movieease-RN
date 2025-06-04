import {Image, Text, View, SafeAreaView, ScrollView} from 'react-native';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar'
import {useRouter} from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    return (
        <>
        <View className={"flex-1 bg-primary"}>
            <Image source={images.bg} className={"absolute z-0 w-full"}/>
            <ScrollView className={"flex-1 px-5"} showsVerticalScrollIndicator={false} contentContainerStyle={{minHeight: "100%", paddingBottom: 10}}>
                <Image source={icons.logo} className={"w-12 h-10 mt-20 mx-auto mb-5"}/>
                <SearchBar
                    onPress={() => router.push("/search")}
                    placeholder={"Search a movie"}
                />
            </ScrollView>
        </View>
        </>
    )
}
