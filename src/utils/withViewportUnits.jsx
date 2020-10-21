import React from 'react';
import { Dimensions, PixelRatio } from 'react-native';

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

const withViewportUnits = (WrappedComponent) => {
  class WithViewportUnits extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        orientation: screenWidth < screenHeight ? 'portrait' : 'landscape',
      };

      this.viewportHeight = this.viewportHeight.bind(this);
      this.viewportWidth = this.viewportWidth.bind(this);
    }

    componentDidMount() {
      Dimensions.addEventListener('change', (newDimensions) => {
        screenWidth = newDimensions.window.width;
        screenHeight = newDimensions.window.height;

        this.setState({ orientation: screenWidth < screenHeight ? 'portrait' : 'landscape' });
      });
    }

    componentWillUnmount() {
      Dimensions.removeEventListener('change', () => {});
    }

    viewportWidth(widthPercent) {
      const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

      return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
    }

    viewportHeight(heightPercent) {
      const elemHeight = typeof heightPercent === 'number' ? heightPercent : parseFloat(heightPercent);

      return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
    }

    render() {
      const { forwardedRef, ...props } = this.props;
      const { orientation } = this.state;

      return (
        <WrappedComponent
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...props}
          orientation={orientation}
          ref={forwardedRef}
          vh={this.viewportHeight}
          vw={this.viewportWidth}
        />
      );
    }
  }

  return React.forwardRef((props, ref) => {
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    return <WithViewportUnits {...props} forwardedRef={ref} />;
  });
};

export default withViewportUnits;
