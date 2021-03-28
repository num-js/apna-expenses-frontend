import React, { useState } from 'react';
import Axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const AddExpenses = (props) => {

    const [expense, setExpense] = useState('');
    const [price, setPrice] = useState('');
    const [pic, setPic] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const addExpense = async (e) => {
        e.preventDefault();
        console.log('newExpenseData: ', expense, price, pic, date);
        const newExpenseData = {
            expense, price, pic, date, description
        }

        const newExpense = await Axios.post(API_URL + 'add-expense', newExpenseData);

        console.log(newExpense);

    }

    return (
        <>
            <form onSubmit={addExpense}>
                <div id="modal1" class="modal">
                    <div className="modal-header">
                        <div align="center">
                            <h5><u>Add Expenses</u></h5>
                        </div>
                    </div>
                    <div class="modal-content">
                        <div className="row">
                            <div class="input-field col l6 s12">
                                <input id="expense" type="text" class="validate" required
                                    value={expense}
                                    onChange={(e) => setExpense(e.target.value)}
                                />
                                <label for="expense">Expense</label>
                            </div>
                            <div class="input-field col l6 s12">
                                <input id="price" type="number" class="validate" required
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <label for="price">Price</label>
                            </div>
                        </div>
                        <div className="row">
                            <div class="input-field col l6 s12">
                                <input id="pic" type="file" class="" placeholder="Select Picture"
                                // value={pic}
                                // onChange={(e) => setPic(e.target.files[0])}
                                />
                            </div>
                            <div class="input-field col l6 s12">
                                <input id="date" type="date" class="validate"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <label for="date">Date</label>
                            </div>
                        </div>
                        <div className="row">
                            <div class="input-field col l8 s12">
                                <textarea rows="6" type="text" class="form-control" placeholder="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn waves-effect waves-light" type="submit" name="action">
                            <i class="material-icons left">add</i>
                            <span style={{ textTransform: 'capitalize' }}>Add Expense</span>
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
}

export default AddExpenses;