import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography, Container } from '@material-ui/core';
import BaseLayout from '../Layouts/BaseLayout';
import useStyles from './expensesPageStyles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllExpensesData } from '../../store/reducers/expensesReducer';
import AddExpensesModal from '../Shared/AddExpensesModalModal';
import AddIcon from "@mui/icons-material/Add";
import FloatingActionButton from '../Shared/FloatingActionButton';


const ExpensesPage = () => {
    const { allExpensesData } = useSelector(state => state.expensesReducer);

    const classes = useStyles();
    const dispatch = useDispatch();

    const [toggleAddExpenseModal, setToggleAddExpenseModal] = useState(false);

    useEffect(() => {
        !allExpensesData && dispatch(fetchAllExpensesData());
    }, []);


    return (
        <>
            <BaseLayout>
                <Container style={{ minHeight: '90vh' }} className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        {allExpensesData && allExpensesData.map((expenses) => (
                            <Grid item key={expenses} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={8}>
                                            <div className={classes.peopleCard}>
                                                <Typography variant="subtitle2">
                                                    {expenses.name}
                                                </Typography>
                                                <span className="text-xs text-gray-400">
                                                    {expenses.date}
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div align="right">
                                                <div className={classes.peopleCard}>
                                                    {expenses.price}
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    <div onClick={() => setToggleAddExpenseModal(true)}>
                        <FloatingActionButton>
                            <AddIcon />
                        </FloatingActionButton>
                    </div>

                    {/* Add Expenses Modal */}
                    <AddExpensesModal
                        toggleAddExpenseModal={toggleAddExpenseModal}
                        setToggleAddExpenseModal={setToggleAddExpenseModal}
                    />


                </Container>
            </BaseLayout>
        </>
    );
}

export default ExpensesPage;