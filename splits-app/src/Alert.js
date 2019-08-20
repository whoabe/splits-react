import React from 'react';
import { Alert } from 'reactstrap';

export default class AlertEx extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.onDismiss = this.onDismiss.bind(this);
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  render() {
    return (
      <Alert color="info" isOpen={this.state.visible} toggle={this.onDismiss}>
        Click on an item row to add it to the "Tabulated Receipt" Table
      </Alert>
    );
  }
}
