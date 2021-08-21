// import { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import BigLoader from '../Layouts/BigLoader';
// import Journals from './Journals/Journals';
// import Footer from '../Footer/Footer';
// import { getCookie } from '../../helpers/CookiesHelper';

// const Home = () => {
//     const history = useHistory();
//     const [componentLoader, setComponentLoader] = useState(true);

//     /**
//      * Check User's Authorization & Redirection
//      */
//     useEffect(() => {
//         if (getCookie('db_access_token')) {
//             setComponentLoader(false);
//         } else {
//             history.push('/signup');
//         }
//     }, []);

//     return (
//         <>
//             {
//                 componentLoader ? (
//                     <BigLoader />
//                 ) : (
//                     <>
//                         <Journals />
//                         <Footer />
//                     </>
//                 )
//             }
//         </>
//     );
// }

// export default Home;