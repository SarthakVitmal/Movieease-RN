// HomeScreen.tsx
import {Image, Text, View, SafeAreaView, ScrollView, ActivityIndicator, FlatList} from 'react-native';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar'
import {useRouter} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import MovieCard from "@/components/MovieCard";
import TrendingCard from "@/components/TrendingCard";
import {getTrendingMovies} from "@/services/appwrite";

export default function HomeScreen() {
    const router = useRouter();

    const{
        data: trendingMovies,
        loading: trendingMoviesLoading,
        error: trendingMoviesError,
    } = useFetch(getTrendingMovies)

    const {data: movies, loading: moviesLoading, error: moviesError} =
        useFetch(() => fetchMovies({query: ''}));

    const renderHeader = () => (
        <View>
            <Image source={icons.logo} className={"w-12 h-10 mt-20 mx-auto mb-5"}/>
            <SearchBar
                onPress={() => router.push("/search")}
                placeholder={"Search a movie"}
            />

            {trendingMovies && (
                <View className={"mt-10"}>
                    <Text className="text-white text-lg font-bold mb-3">Trending Movies</Text>
                    <FlatList
                        className={"mb-4 mt-3"}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ItemSeparatorComponent={() => <View className={"w-4"} />}
                        data={trendingMovies}
                        renderItem={({item,index}) => (
                            <TrendingCard movie={item} index={index}/>
                        )}
                        keyExtractor={(item) => item.movie_id.toString()}
                    />
                </View>
            )}

            <Text className={"text-lg text-white font-bold mt-5 mb-3"}>Latest Movies</Text>
        </View>
    );

    // @ts-ignore
    return (
        <View className={"flex-1 bg-primary"}>
            <Image source={images.bg} className={"absolute z-0 w-full"}/>

            {moviesLoading || trendingMoviesLoading ? (
                <ActivityIndicator size={"large"} color={"#0000ff"} className={"mt-10 self-center"}/>
            ) : moviesError || trendingMoviesError ? (
                <Text className="text-white">Error: {moviesError?.message || trendingMoviesError?.message}</Text>
            ) : (
                <FlatList
                    className={"flex-1 px-5"}
                    data={movies}
                    renderItem={({item}) => (
                        <MovieCard {...item}/>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{justifyContent: "flex-start",gap:20,paddingRight:5,marginBottom:10}}
                    ListHeaderComponent={renderHeader}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{minHeight: "100%", paddingBottom: 42}}
                />
            )}
        </View>
    );
}