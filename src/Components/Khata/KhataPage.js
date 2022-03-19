import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllKhataTransactions, fetchAllKhatas } from '../../store/reducers/khataReducer';
import BaseLayout from '../Layouts/BaseLayout';
import AddIcon from "@mui/icons-material/Add";
import FloatingActionButton from '../Shared/FloatingActionButton';
import { Drawer } from '@material-ui/core';
import AddMoneyForm from './AddMoneyForm';
import { getTotalOfAmountArray, getTotalOfReceiveAmountArray, getTotalOfSendAmountArray } from '../../helpers/getTotalOfAmountArray';
import { getDate } from '../../helpers/DatesFormatter';

const KhataPage = () => {
    const { allKhataTransactions, allKhatas, selectedKhata } = useSelector(state => state.khataReducer);
    const dispatch = useDispatch();
    const [toggleBottomSheet, setToggleBottomSheet] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);


    useEffect(() => {
        !allKhatas && dispatch(fetchAllKhatas());
    }, []);

    useEffect(() => {
        selectedKhata && dispatch(fetchAllKhataTransactions(selectedKhata._id));
    }, [selectedKhata]);

    return (
        <>
            <BaseLayout>
                <div class="page-full-height">
                    {/* <div onClick={() => setToggleBottomSheet(true)}>
                        <FloatingActionButton positions={{ bottom: 100, left: 30 }} color='secondary'>
                            <AddIcon />
                        </FloatingActionButton>
                    </div> */}
                    <div onClick={() => setToggleBottomSheet(true)}>
                        <FloatingActionButton>
                            <AddIcon />
                        </FloatingActionButton>
                    </div>

                    <section class="mt-5">
                        <div class=" mx-auto">
                            <div class="mx-1  rounded">
                                <div>
                                    <div class="w-full">
                                        <div>
                                            <div class="relative flex items-center p-3 border-b border-gray-300">
                                                <img class="object-cover w-10 h-10 rounded-full cursor-pointer" src="../images/nlogo.jpg" alt="username" />
                                                <span class="block ml-2 font-bold text-gray-600 cursor-pointer">{selectedKhata?.title}</span>
                                                <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                                                <span class="block ml-auto font-bold text-gray-200">
                                                    ₹ {allKhataTransactions && getTotalOfAmountArray(allKhataTransactions)}
                                                </span>
                                            </div>
                                        </div>

                                        <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
                                            <ul class="space-y-2">
                                                {allKhataTransactions && allKhataTransactions.map((transaction) => (
                                                    <li class={`flex ${transaction.transactionType === "receive" ? "justify-start" : "justify-end"}`}>
                                                        <div class={`relative max-w-xl px-4 py-2 rounded shadow text-white 	min-w-max cursor-pointer ${transaction.transactionType === "receive" ? 'bg-pink-800' : 'bg-gray-500'}`}
                                                            onClick={() => setSelectedTransaction(transaction)}
                                                        >
                                                            <span class="block"> {transaction.title} </span>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <div className="mr-20 text-sm text-gray-400"> {getDate(transaction.date)} </div>
                                                                <div className="font-bold"> ₹ {transaction.amount} </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Drawer
                        anchor={"bottom"}
                        open={toggleBottomSheet}
                        onClose={() => setToggleBottomSheet(false)}
                        style={{ background: 'transparent' }}
                    >
                        <AddMoneyForm setToggleBottomSheet={setToggleBottomSheet} />
                    </Drawer>

                    <Drawer
                        anchor={"bottom"}
                        open={selectedTransaction}
                        onClose={() => { setSelectedTransaction(null); }}
                        style={{ background: 'transparent' }}
                    >
                        <AddMoneyForm setToggleBottomSheet={setToggleBottomSheet}
                            selectedTransaction={selectedTransaction}
                            setSelectedTransaction={setSelectedTransaction}
                        />
                    </Drawer>

                </div>
            </BaseLayout>
        </>
    );
}

export default KhataPage;
