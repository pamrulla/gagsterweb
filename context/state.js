import {Component, createContext, useContext, useReducer, useState} from 'react';

export const AppContext = createContext();
export const AppDispatchContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'LOGGEDIN':
            console.log("Logging in ....")
            return true;
        case 'LOGGEDOUT':
            return false;
        default:
            throw new Error(`Unknown action: ${action.type}`)
    }
}

export class AppProvider1 extends Component {
    state = {
        appState: {
            user : {},
            isLoggedIn: false,
            auth_token: '',
        },
    }

    updateAppData = (appState) => {
        this.setState((prevState) => ({appState}))
    }

    render() {
        const { children } = this.props
        const { appState } = this.state
        const { updateAppData } = this
    
        return (
          <AppContext.Provider
            value={{
                appState,
                updateAppData,
            }}
          >
            {children}
          </AppContext.Provider>
        )
      }
}

export const useAppState = () => useContext(AppContext)
export const useAppDispatchState = () => useContext(AppDispatchContext)
