import React, { useState } from 'react';
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup, Slide, TextField } from '@material-ui/core';

const BottomSheet = ({ addExpenseBottomSheet, setAddExpenseBottomSheet }) => {

    const [open, setOpen] = useState(false);

    const Transition = React.forwardRef(function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleAddChannelModalClose = () => {
        setOpen(false);
    };

    return (
        <>


            <Button variant="outlined" onClick={handleClickOpen}>
                +
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleAddChannelModalClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Add Channel</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div>
                            {/* <TextField label="Group Name" variant="outlined"
                                value={newGroupName}
                                onChange={(event) => setNewGroupName(event.target.value)}
                            /> */}
                            <br /><br />

                            <form id="usersForm">
                                <input
                                    type="text"
                                />
                            </form>
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={handleAddChannelModalClose}>Cancel</Button> */}
                    <Button
                        // onClick={createChannelHandler} 
                        type="submit">Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default BottomSheet;