import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExpensesData, deleteExpense } from '../../store/reducers/expensesReducer';
import BaseLayout from '../Layouts/BaseLayout';
import AddIcon from "@mui/icons-material/Add";
import FloatingActionButton from '../Shared/FloatingActionButton';
import { Drawer } from '@material-ui/core';
import AddMoneyForm from './AddMoneyForm';

const AccountPage = () => {
    const { allExpensesData } = useSelector(state => state.expensesReducer);
    const dispatch = useDispatch();
    const [toggleBottomSheet, setToggleBottomSheet] = useState(false);

    // useEffect(() => {
    //     !allExpensesData && dispatch(fetchAllExpensesData());
    // }, []);

    return (
        <>
            <BaseLayout>
                <div class="page-full-height">
                    <div onClick={() => setToggleBottomSheet(true)}>
                        <FloatingActionButton>
                            <AddIcon />
                        </FloatingActionButton>
                    </div>

                    <section class="text-gray-600 body-font" style={{ minHeight: '90vh' }}>
                        <div class="container px-5 py-4 mx-auto">
                            <div class="flex flex-wrap -m-2">
                                {allExpensesData && allExpensesData.map((expenses) => (
                                    <div key={expenses._id} class="p-2 lg:w-1/3 md:w-1/2 w-full">
                                        <div class="h-full flex items-center justify-between border-gray-200 border p-4 rounded-lg">
                                            <div class="">
                                                <h2 class="text-white title-font font-medium"> {expenses.name} </h2>
                                                <p class="text-gray-500"> {expenses.date} &nbsp; </p>
                                            </div>
                                            <div class="">
                                                <h2 class="text-white title-font font-medium"> ₹ {expenses.price} </h2>
                                                <button className="relative" style={{ top: '34px', left: '41px', }}
                                                    onClick={() => dispatch(deleteExpense(expenses._id))}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#ee3e3e" viewBox="0 0 30 30" width="30px" height="30px">    <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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

export default AccountPage;
