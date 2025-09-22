
import { createContext } from 'react';
import useFirebase from '../../Hooks/useFirebase';
import PropTypes from "prop-types";


export const AuthContext = createContext();



const AuthProvider = ({ children }) => {
    const AllContext = useFirebase();

   
    return (
        <AuthContext.Provider value={AllContext}>
            {children}
        </AuthContext.Provider>
    );

};

AuthProvider.propTypes = {
    children: PropTypes.arrayOf(PropTypes.object).isRequired, 
};
export default AuthProvider;