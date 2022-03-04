import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BigLoader from '../Layouts/BigLoader';
import { getCookie } from '../../helpers/CookiesHelper';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useDispatch } from 'react-redux';
import { SIGNIN } from '../../routes/routesConstants';

const BaseLayout = ({ children }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [componentLoader, setComponentLoader] = useState(true);

    /**
     * Check User's Authorization & Redirection
     */
    useEffect(() => {
        if (getCookie('apna-expenses-token')) {
            setComponentLoader(false);
        } else {
            history.push(SIGNIN);
            return;
        }
    }, []);

    return (
        <>
            {
                componentLoader ? (
                    <BigLoader />
                ) : (
                    <>
                        <Header />
                        {children}
                        <Footer />
                    </>
                )
            }
        </>
    );

}

export default BaseLayout;
