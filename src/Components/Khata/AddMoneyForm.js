import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FetchAPIData from '../../helpers/FetchAPIData';
import { addKhataTransaction, deleteKhataTransaction, updateKhataTransaction } from '../../store/reducers/khataReducer';

const AddMoneyForm = ({ setToggleBottomSheet, selectedTransaction, setSelectedTransaction }) => {
    const { selectedKhata } = useSelector(state => state.khataReducer);
    const dispatch = useDispatch();

    const [title, setTitle] = useState(selectedTransaction?.title || "");
    const [amount, setAmount] = useState(selectedTransaction?.amount || "");
    const [message, setMessage] = useState(selectedTransaction?.message || "");
    const [date, setDate] = useState(selectedTransaction?.date && new Date(selectedTransaction?.date)?.toISOString()?.split("T")[0] || "");
    const [transactionType, setTransactionType] = useState(selectedTransaction?.transactionType || "receive");
    const [enableEdit, setEnableEdit] = useState(false);


    const addKhataTransactionHandler = async (event) => {
        event.preventDefault();
        if (!title || !amount) {
            toast.error('Please Enter Title & Amount');
            return;
        }

        let newKhataTransaction = {
            title,
            amount,
            message,
            transactionType,
            khata: selectedKhata._id,
        }

        if (date) {
            newKhataTransaction.date = date;
        }

        try {
            const response = await FetchAPIData('post', '/add-khata-transaction', newKhataTransaction);
            console.log('response: ', response);
            setToggleBottomSheet(false);
            dispatch(addKhataTransaction(response.data.data));
        } catch (error) {
            console.log('Error in Adding Expense: ', error);
        }
    }

    const updateKhataTransactionHandler = async (event) => {
        event.preventDefault();
        if (!title || !amount) {
            toast.error('Please Enter Title & Amount');
            return;
        }

        let updatedKhataTransaction = {
            title,
            amount,
            message,
            transactionType,
        }

        if (date) {
            updatedKhataTransaction.date = date;
        }

        try {
            const response = await FetchAPIData('put', `/update-khata-transaction/${selectedTransaction._id}`, updatedKhataTransaction);
            console.log('response: ', response);
            dispatch(updateKhataTransaction(response.data.data));
            setSelectedTransaction(null);
        } catch (error) {
            console.log('Error in Updating Transaction: ', error);
        }
    }

    const deleteKhataTransactionHandler = async (event) => {
        event.preventDefault();

        try {
            const response = await FetchAPIData('delete', `/delete-khata-transaction/${selectedTransaction._id}`);
            console.log('response: ', response);
            dispatch(deleteKhataTransaction(response.data.data));
            setSelectedTransaction(null);
        } catch (error) {
            console.log('Error in Deleting Transaction: ', error);
        }
    }

    return (
        <div class="flex">
            <div class="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-4 flex flex-col md:ml-auto w-full z-10 shadow-md">
                <form onSubmit={selectedTransaction ? updateKhataTransactionHandler : addKhataTransactionHandler}>
                    <div className="flex justify-between">
                        <div>
                            <h2 class="text-gray-900 text-lg mb-1 font-medium title-font">Add Transaction</h2>
                        </div>
                        <div>
                            {
                                selectedTransaction && (
                                    enableEdit ? (
                                        <span className="mr-6 cursor-pointer"
                                            onClick={() => setEnableEdit(false)}
                                        >Cancel</span>
                                    ) : (
                                        <span className="mr-6 cursor-pointer"
                                            onClick={() => setEnableEdit(true)}
                                        >Edit</span>
                                    )
                                )
                            }
                            <span className="mr-6 cursor-pointer"
                                onClick={deleteKhataTransactionHandler}
                            >Delete</span>
                            <span className="relative cursor-pointer -top-3"
                                onClick={() => { selectedTransaction ? setSelectedTransaction(null) : setToggleBottomSheet(false) }}
                            >X</span>
                        </div>
                    </div>

                    <div class="flex flex-col text-center w-full">
                        {
                            selectedTransaction && !enableEdit ? (
                                <div class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden">
                                    <div class={`py-1 px-4 focus:outline-none cursor-pointer bg-indigo-500 text-white`}> {transactionType} </div>
                                </div>
                            ) : (
                                    <div class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden">
                                        <div class={`py-1 px-4 focus:outline-none cursor-pointer ${transactionType === "receive" ? 'bg-indigo-500 text-white' : ''}`}
                                            onClick={() => setTransactionType('receive')}
                                        > Receive</div>
                                        <div class={`py-1 px-4 focus:outline-none cursor-pointer ${transactionType === "send" ? 'bg-indigo-500 text-white' : ''}`}
                                            onClick={() => setTransactionType('send')}
                                        > Send </div>
                                    </div>
                            )
                        }
                    </div>



                    <div class="mb-4">
                        <label for="title" class="leading-7 text-sm text-gray-600">Title</label>
                        <input type="text" id="title" class={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${selectedTransaction && !enableEdit ? 'disable-all' : ''}`}
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            placeholder="Mobile"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="amount" class="leading-7 text-sm text-gray-600">Amount</label>
                        <input type="number" id="amount" class={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${selectedTransaction && !enableEdit ? 'disable-all' : ''}`}
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            placeholder="8000"
                        />
                    </div>
                    <div class="mb-4">
                        <label for="message" class="leading-7 text-sm text-gray-600">Message</label>
                        <textarea id="message" class={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${selectedTransaction && !enableEdit ? 'disable-all' : ''}`}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                            placeholder="RealMe 7"
                        ></textarea>
                    </div>
                    <div class="mb-4">
                        <label for="date" class="leading-7 text-sm text-gray-600">Date</label>
                        <input type="date" id="date" class={`w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out ${selectedTransaction && !enableEdit ? 'disable-all' : ''}`}
                            value={date}
                            onChange={(event) => setDate(event.target.value)}
                            placeholder="23/02/2022"
                        />
                    </div>
                    <button class="w-full text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded text-lg" type="submit">
                        {selectedTransaction ? 'Update' : 'Add'} Transaction
                    </button>
                    {/* loader ->
                     <svg role="status" class="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg> */}
                    {/* <p class="text-xs text-gray-500 mt-3">Some Txt.</p> */}
                </form>
            </div >
        </div >
    );
}

export default AddMoneyForm;
