import { Text, View, SafeAreaView} from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
    return (
        <SafeAreaView className={"mt-6 bg-white justify-center items-center flex-1 font-extrabold"}>
            <Text className={"bg-purple-50 text-7xl"}>Welcome</Text>
        </SafeAreaView>
    )
}
