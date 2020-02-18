import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from '../screens/HomePage'
import NotesPage from '../screens/NotesPage'
import EditNotePage from '../screens/EditNotePage'
import ProfilePage from '../screens/ProfilePage'
import { Ionicons, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
const Tab = createBottomTabNavigator()
const MATERIAL_COMMUNITY_ICONS = 'MaterialCommunityIcons'
const IONICONS = 'Ionicons'
const ANTDESIGN = 'AntDesign'

const TabNavigation = ({ client, setToken }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          let type

          if (route.name === 'Home') {
            iconName = 'ios-home'
            type = IONICONS
          } else if (route.name === 'Profile') {
            iconName = 'profile'
            type = ANTDESIGN
          } else if (route.name === 'EditNote') {
            iconName = 'edit'
            type = ANTDESIGN
          } else if (route.name === 'Notes') {
            iconName = 'note-multiple'
            type = MATERIAL_COMMUNITY_ICONS
          }

          // You can return any component that you like here!
          if (type === IONICONS) {
            return <Ionicons name={iconName} size={size} color={color} />
          } else if (type === ANTDESIGN) {
            return <AntDesign name={iconName} size={size} color={color} />
          } else if (type === MATERIAL_COMMUNITY_ICONS) {
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        }
      })}
      tabBarOptions={{
        activeTintColor: 'salmon',
        inactiveTintColor: 'gray'
      }}
    >
      <Tab.Screen name='Home' component={HomePage} />
      <Tab.Screen name='Notes'>
        {props => <NotesPage {...props} client={client} />}
      </Tab.Screen>
      <Tab.Screen name='EditNote'>
        {props => <EditNotePage {...props} client={client} />}
      </Tab.Screen>
      <Tab.Screen name='Profile'>
        {props => (
          <ProfilePage {...props} client={client} setToken={setToken} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  )
}
export default TabNavigation
