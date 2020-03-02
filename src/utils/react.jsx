import React from 'react';
import ReactReduxContext from 'react-redux/lib/components/Context';

export const container = (Component, methods = {}) => {
  class Class extends React.Component {
    constructor(props) {
      super(props);

      Object.keys(methods).forEach((m) => {
        this[m] = methods[m];
      });
    }

    render() {
      return React.createElement(Component, this.props);
    }
  }

  Class.contextType = ReactReduxContext;

  return Class;
};
