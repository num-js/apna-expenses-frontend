import React from 'react';
import { Card, Grid, Typography, Container } from '@material-ui/core';
import BaseLayout from '../Layouts/BaseLayout';
import useStyles from './therapistStyles';

const therapists = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const ExpensesPage = () => {
    const classes = useStyles();

    return (
        <>
            <BaseLayout>
                <Container style={{ minHeight: '90vh' }} className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {therapists.map((therapist) => (
                            <Grid item key={therapist} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={8}>
                                            <div className={classes.peopleCard}>
                                                <Typography variant="subtitle2">
                                                    Mobile - Poco M2 Pro
                                                </Typography>
                                                <span className="text-xs text-gray-400">
                                                    31-10-21
                                                </span>
                                            </div>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <div align="right">
                                                <div className={classes.peopleCard}>
                                                    12,000
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </BaseLayout>
        </>
    );
}

export default ExpensesPage;