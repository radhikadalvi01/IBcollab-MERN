import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Modal = (props) => {

  return (
    <div>

      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        
        <DialogTitle id="alert-dialog-title" style={{alignSelf:'center'}}>
          {props.errorTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default Modal