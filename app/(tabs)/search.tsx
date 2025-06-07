import {Text, View, Image, FlatList, ActivityIndicator} from 'react-native';
import {images} from "@/constants/images";
import MovieCard from "@/components/MovieCard";
import useFetch from "@/services/useFetch";
import {fetchMovies} from "@/services/api";
import {useRouter} from 'expo-router';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar'
import {useState, useEffect } from 'react';
import SearchImg from '@/assets/images/Search.svg'
import NotFoundImg from '@/assets/images/Not-Found.svg'


export default function Search(){
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const {data: movies, loading: moviesLoading, error: moviesError, reset, refetch: loadMovies} =
        useFetch(() => fetchMovies({query: searchQuery}));

    useEffect(() => {
        const timoutId = setTimeout(async() => {
            if(searchQuery.trim()){
                await loadMovies();
            }else reset();
    },500);
        return () => {clearTimeout(timoutId);};
    },[searchQuery])

    return(
        <View className={"flex-1 bg-primary"}>
            <Image source={images.bg} className={"flex absolute w-full z-0"} resizeMode={"cover"}/>
            <FlatList data={movies} renderItem={({item}) => <MovieCard {...item}/>}
                      keyExtractor={(item) => item.id.toString()}
                      numColumns={3}
                      columnWrapperStyle={{justifyContent: "flex-start",gap:20,
                          paddingRight:5,marginBottom:10,
                          marginVertical:16}}
                      className={"px-5"}
                      contentContainerStyle={{paddingBottom:16}}
                      ListHeaderComponent={
                <>
                    <View className={"w-full flex-row justify-center mt-20 items-center"}>
                        <Image source={icons.logo} className={"w-12 h-10"}/>
                    </View>
                    <View>
                        <SearchBar placeholder={"Search movies..."}
                            value={searchQuery} onChangeText={(text:string) => setSearchQuery(text)}
                        />
                    </View>

                    {moviesLoading && (
                        <ActivityIndicator size={"large"} color={"#0000ff"} className={"my-3"} />
                    )}

                    {moviesError && (
                        <Text className={"text-red-500 px-5 my-3"}>Error:{moviesError.message}</Text>
                    )}

                    {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
                        <Text className={"text-xl text-white font-bold"}>
                            Search Results for
                            <Text className={"text-accent space-x-2"}>{searchQuery}</Text>
                        </Text>
                    )}
                </>
                      }
                      ListEmptyComponent={
                !moviesLoading && !moviesError ? (
                    <View className={"mt-10 px-5"}>
                        <Text className={"text-center text-gray-500"}>
                            {searchQuery.trim() ? 'Movie not found'  : 'Search the movie'
                            }
                        </Text>
                    </View>
                ) : null
            }
            />
        </View>
    )
}