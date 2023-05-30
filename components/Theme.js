import React, {useState, useContext} from 'react';
import {View, Switch} from 'react-native';
//import {theme, darkTheme} from './theme';



const ThemeContext = React.createContext({})

const App = () => {
  const [darkMode, setDarkMode] = useState(false)
  return (
    <ThemeContext.Provider value={darkMode ? darkTheme : theme}>
      <ThemedComponent />
      <Switch value={darkMode} onValueChange={setDarkMode} />
    </ThemeContext.Provider>
  )
}

const ThemedComponent = () => {
  // Get the theme with React's context API
  const themeFromContext = useContext(ThemeContext)
  return (
    <View
      style={{
        width: 200,
        height: 200,
        background: themeFromContext.colors.background,
      }}
    />
  )
}



const palette = {
    purple: '',
    green: '#0ECD9D',
    red: '#FF0000',
    midnightblue: '#00266B',
    white: '#FFFFFF',
    phantomgray: '#9EA2A2',
  }
  
  export const theme = {
    colors: {
      background: palette.white,
      foreground: palette.black,
      primary: palette.purple,
      success: palette.green,
      danger: palette.red,
      failure: palette.red,
    },

    spacing: {
      s: 8,
      m: 16,
      l: 24,
      xl: 40,
    },

    textVariants: {
      header: {
        fontFamily: 'BandaNova',
        fontSize: 36,
        fontWeight: 'bold',
      },

      body: {
        fontFamily: 'BandaNova',
        fontSize: 16,
      },
      
    }
  };
  
  export const darkTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: palette.blue,
      foreground: palette.white,
    }
  }