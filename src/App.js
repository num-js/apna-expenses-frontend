import React, { useEffect, useState } from 'react';
import NavBar from './components/elements/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import Card from './components/Card';
import './styles/app.css';
import AddExpenses from './components/Modals/AddExpensesModal';

const API_URL = process.env.REACT_APP_API_URL;

function App() {

    const [allExpenses, setAllExpenses] = useState([]);

    useEffect(() => {
        // Init Materialize JS
        M.AutoInit();
    });


    return (
        <>
            <Router>
                <div className="App">
                    <NavBar />
                    <ToastContainer
                        position="top-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <div className="container">

                        {/* Add Expenses Button */}
                        <div class="fixed-action-btn">
                            <a class="btn-floating btn-large z-depth-5 pulse darken-3">
                                <i class="large material-icons modal-trigger" href="#modal1">add</i>
                            </a>
                        </div>

                        {/* Add Expenses Modal */}
                        <AddExpenses
                            setAllExpenses={setAllExpenses}
                        />

                        <div className="">
                            <br />
                            <div class="row">
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                                <Card />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        </>
    );
}

export default App;
