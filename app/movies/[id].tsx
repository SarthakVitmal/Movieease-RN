import {Text, View, ScrollView, Image, TouchableOpacity} from 'react-native';
import {useLocalSearchParams} from "expo-router";
import useFetch from "@/services/useFetch";
import {fetchMovieDetails} from "@/services/api";
import { icons } from '@/constants/icons';
import React from "react";
import {useRouter} from 'expo-router'

interface MovieInfoProps {
    label: string;
    value?: string | number | null;
}

const MovieInfo = ({label, value}: MovieInfoProps) => {
    return(
        <View className={"flex-col items-start justify-center mt-5"}>
            <Text className={"text-light-200 font-normal text-sm"}>
                {label}
            </Text>
            <Text className={"text-light-100 font-bold text-sm mt-2"}>
                {value || 'NA'}
            </Text>
        </View>
    )
}

export default function MovieDetails(){
    const {id} = useLocalSearchParams();
    const router = useRouter();

    const {data : movie, loading} = useFetch(() => fetchMovieDetails(id as string));

    return(
        <View className={"bg-primary flex-1"}>
            <TouchableOpacity
                onPress={router.back}
                className={"absolute top-14 left-5 z-50 bg-accent rounded-full p-2"}
                style={{elevation: 3}}
            >
                <Image
                    source={icons.arrow}
                    alt={"arrow"}
                    className={"size-5"}
                    tintColor={"#fff"}
                    style={{transform: [{rotate: '180deg'}]}}
                />
            </TouchableOpacity>

            <ScrollView
                contentContainerStyle={{paddingBottom: 80}}
            >
                <View>
                    <Image
                        className={"w-full h-[550px]"}
                        resizeMode={"stretch"}
                        source={{uri:`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}}
                    />
                </View>
                <View className={"flex-col items-start justify-center mt-5 px-5"}>
                    <Text className={"text-white font-bold text-xl"}>{movie?.title}</Text>
                    <View className={"flex-row items-center gap-x-1 mt-2"}>
                        <Text className={"text-light-200 text-sm"}>{movie?.release_date.split("-")[0]}</Text>
                        <Text className={"text-light-200 text-sm"}>{movie?.runtime}m</Text>
                    </View>
                    <View className={"flex-row items-center bg-dark-100 px-2 space-x-2 py-1 rounded-md mt-2"}>
                        <Image source={icons.star} className={"size-4"}/>
                        <Text className={"text-sm font-bold uppercase text-white"}>{Math.round(movie?.vote_average?? 0)}/10</Text>
                        <Text className={"text-light-200 text-sm"}>({movie?.vote_count} votes)</Text>
                    </View>

                    <MovieInfo label={"Overview"} value={movie?.overview}/>
                    <MovieInfo label={"Genres"} value={movie?.genres?.map((g) => g.name).join(" - ") || 'N/A'}/>
                    <View className={"flex flex-row justify-between w-1/2"}>
                        {/*@ts-ignore*/}
                        <MovieInfo label={"Budget"} value={`$${movie?.budget / 1_000_000} million`} />
                        {/*@ts-ignore*/}
                        <MovieInfo label={"Revenue"} value={`$${Math.round(movie?.revenue / 1_000_000)} million`} />
                    </View>
                    <MovieInfo label={"Production Companies"} value={movie?.production_companies.map((c) => c.name).join(" - ") || 'N/A'}/>
                </View>
            </ScrollView>
        </View>
    )
}