import { Tabs } from "expo-router"
import { ImageBackground, Image, Text, View, StyleSheet } from "react-native"
import { images } from "@/constants/images"
import { icons } from "@/constants/icons"

type TabIconProps = {
    focused: boolean
    icon: any
    title: string
}

const TabIcon = ({ focused, icon, title }: TabIconProps) => {
    return focused ? (
        <ImageBackground source={images.highlight} style={styles.activeTabBackground} resizeMode="contain">
            <View style={styles.activeTabContent}>
                <Image source={icon} style={[styles.icon, { tintColor: "#151312" }]} />
                <Text style={styles.activeTabText}>{title}</Text>
            </View>
        </ImageBackground>
    ) : (
        <View style={styles.inactiveTab}>
            <Image source={icon} style={[styles.icon, { tintColor: "#A8B5DB" }]} />
        </View>
    )
}

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: styles.tabBarItem,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.home} title="Home" />,
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Search",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.search} title="Search" />,
                }}
            />
            <Tabs.Screen
                name="saved"
                options={{
                    title: "Saved",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.save} title="Saved" />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icons.person} title="Profile" />,
                }}
            />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabBar: {
        height: 70,
        backgroundColor: "#0F0D23",
        borderTopWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 30,
        marginHorizontal: 16,
        marginBottom: 16,
        paddingHorizontal: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabBarItem: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    },
    activeTabBackground: {
        width: 112,
        height: 40,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    activeTabContent: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 12,
    },
    activeTabText: {
        color: "#151312",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 8,
    },
    inactiveTab: {
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
    },
    icon: {
        width: 22,
        height: 22,
        resizeMode: "contain",
    },
})
