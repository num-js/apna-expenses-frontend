import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllKhataTransactions } from '../../store/reducers/khataReducer';
import BaseLayout from '../Layouts/BaseLayout';
import AddIcon from "@mui/icons-material/Add";
import FloatingActionButton from '../Shared/FloatingActionButton';
import { Drawer } from '@material-ui/core';
import AddMoneyForm from './AddMoneyForm';

const KhataPage = () => {
    const { allKhataTransactions } = useSelector(state => state.khataReducer);
    const dispatch = useDispatch();
    const [toggleBottomSheet, setToggleBottomSheet] = useState(false);

    useEffect(() => {
        !allKhataTransactions && dispatch(fetchAllKhataTransactions());
    }, []);

    return (
        <>
            <BaseLayout>
                <div class="page-full-height">
                    <div onClick={() => setToggleBottomSheet(true)}>
                        <FloatingActionButton positions={{ bottom: 100, left: 30 }} color='secondary'>
                            <AddIcon />
                        </FloatingActionButton>
                    </div>
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
                                                <img class="object-cover w-10 h-10 rounded-full" src="../images/nlogo.jpg" alt="username" />
                                                <span class="block ml-2 font-bold text-gray-600">Mama</span>
                                                <span class="absolute w-3 h-3 bg-green-600 rounded-full left-10 top-3"></span>
                                                <span class="block ml-auto font-bold text-gray-600"> ₹ 150000</span>
                                            </div>
                                        </div>

                                        <div class="relative w-full p-6 overflow-y-auto h-[40rem]">
                                            <ul class="space-y-2">
                                                {allKhataTransactions && allKhataTransactions.map((transaction) => (
                                                    <li class={`flex ${transaction.transactionType === "receive" ? "justify-start" : "justify-end"}`}>
                                                        <div class={`relative max-w-xl px-4 py-2 rounded shadow ${transaction.transactionType === "receive" ? 'text-white bg-blue-500' : 'text-gray-700 bg-gray-100'}`} style={{ minWidth: '60%' }}>
                                                            <span class="block"> {transaction.title} </span>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <div className="text-gray-200"> {transaction.date} </div>
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
                </div>
            </BaseLayout>
        </>
    );
}

export default KhataPage;
