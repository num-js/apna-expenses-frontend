import React, { useState } from 'react';

import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Modal, Slide, TextField } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Modal from '@material-ui/core/Modal';


function getModalStyle() {
    const top = 50;
    const left = 50;
    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        margin: '10px',
        maxWidth: '600px',
        backgroundColor: 'black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const AddExpensesModal = ({ toggleAddExpenseModal, setToggleAddExpenseModal }) => {

    const classes = useStyles();


    return (
        <>
            <div>

                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={toggleAddExpenseModal}
                    onClose={() => setToggleAddExpenseModal(false)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                        NNNNNNNNNNNN
                    </div>
                </Modal>


                {/* <Dialog
                    open={toggleAddExpenseModal}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={() => setToggleAddExpenseModal(false)}
                    aria-describedby="alert-dialog-slide-description"
                    sx={"xl"}

                >
                    <DialogTitle>Add Expenses</DialogTitle>
                    <form>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                <div>
                                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                                </div>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={null} type="submit">Save</Button>
                        </DialogActions>
                    </form>

                </Dialog> */}
            </div>
        </>
    )
}

export default AddExpensesModal;