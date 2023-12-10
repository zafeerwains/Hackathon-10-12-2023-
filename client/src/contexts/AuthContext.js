import React, { createContext, useContext, useEffect, useReducer } from 'react'
const AuthContext = createContext()
export default function AuthContextProvider({ children }) {
    const initState = { isAuth: false, user: {} }
    const reducer = (state, { type, payload }) => {
        switch (type) {
            case "SET_LOGGED_IN":
                return { isAuth: true, user: payload.user }
            case "SET_LOGGED_OUT":
                return initState
            default:
                return state
        }
    }
    const [state, dispatch] = useReducer(reducer, initState)
    const readUser = async (user) => {
        const docRef = doc(firestore, "users", user.uid);
        // console.log('user.uid', user.uid)
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const user = docSnap.data()
            dispatch({ type: "SET_LOGGED_IN", payload: { user } })
        } else {
            console.log("No such document!");
        }
    }
  
    return (
        <>
            <AuthContext.Provider value={{ ...state, dispatch, readUser }} >
                {children}
            </AuthContext.Provider>
        </>
    )
}
export const useAuthContext = () => useContext(AuthContext) 