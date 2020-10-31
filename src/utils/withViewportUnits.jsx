import React from 'react';
import { PixelRatio } from 'react-native';
import { ReactReduxContext } from 'react-redux';

const withViewportUnits = (WrappedComponent) => {
  class WithViewportUnits extends React.Component {
    constructor(props, context) {
      super(props, context);

      const {
        store: { getState },
      } = context;
      const {
        app: { screenHeight, screenOrientation, screenWidth },
      } = getState();

      this.state = { screenHeight, screenOrientation, screenWidth };

      this.viewportHeight = this.viewportHeight.bind(this);
      this.viewportWidth = this.viewportWidth.bind(this);
    }

    componentDidMount() {
      const {
        store: { getState, subscribe },
      } = this.context;

      this.unsubscribeStore = subscribe(() => {
        const {
          app: { screenHeight, screenOrientation, screenWidth },
        } = getState();

        this.setState({ screenHeight, screenOrientation, screenWidth });
      });
    }

    componentWillUnmount() {
      if (this.unsubscribeStore) this.unsubscribeStore();
    }

    viewportWidth(widthPercent) {
      const { screenWidth } = this.state;
      const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

      return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
    }

    viewportHeight(heightPercent) {
      const { screenHeight } = this.state;
      const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);

      return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
    }

    render() {
      const { forwardedRef, ...props } = this.props;
      const { screenOrientation } = this.state;

      return (
        <WrappedComponent
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...props}
          orientation={screenOrientation}
          ref={forwardedRef}
          vh={this.viewportHeight}
          vw={this.viewportWidth}
        />
      );
    }
  }

  WithViewportUnits.contextType = ReactReduxContext;

  return React.forwardRef((props, ref) => {
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    return <WithViewportUnits {...props} forwardedRef={ref} />;
  });
};

export default withViewportUnits;
