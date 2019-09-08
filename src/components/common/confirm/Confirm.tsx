import React from 'react';
import { Dialog, Slide, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { TransitionProps } from '@material-ui/core/transitions';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IConfirmProps {
  title?: string;
  content: string;
  className: string;
  onConfirm: any;
}

class Confirm extends React.Component<IConfirmProps> {
  state = {
    open: false
  }
  toggleConfirm() {
    this.setState({ open: !this.state.open });
  }
  onConfirm() {
    this.setState({ open: false });
    this.props.onConfirm();
  }
  render() {
    return (
      <div className={this.props.className}>
        <div onClick={this.toggleConfirm.bind(this)}>{this.props.children}</div>
        <Dialog open={this.state.open} TransitionComponent={Transition}>
          <DialogTitle>{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{this.props.content}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.toggleConfirm.bind(this)}>Cancel</Button>
            <Button color="primary" onClick={this.props.onConfirm}>Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Confirm;
