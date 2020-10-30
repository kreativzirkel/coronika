import React from 'react';
import { Appearance } from 'react-native';
import { COLOR_SECONDARY } from '../constants';
import { ReactReduxContext } from 'react-redux';
import { setColorScheme as setColorSchemeSettings } from '../components/screens/Settings/actions';

const withColorScheme = (WrappedComponent) => {
  class WithColorScheme extends React.Component {
    constructor(props, context) {
      super(props, context);

      const {
        store: { getState },
      } = context;
      const {
        settings: { colorScheme: settingsColorScheme },
      } = getState();

      const scheme = Appearance.getColorScheme() || settingsColorScheme || 'light';

      this.state = {
        colorScheme: scheme,
        colors: this.getColors(scheme),
      };

      this.appearanceListener = this.appearanceListener.bind(this);
      this.getColors = this.getColors.bind(this);
    }

    colorsDark = {
      BACKGROUND: '#000000',
      ERROR: '#cc0000',
      GRAY_1: '#d6d6d6',
      GRAY_2: '#707070',
      GRAY_3: '#6f6f6f',
      GRAY_4: '#b0b0b1',
      MODAL_BACKDROP_COLOR: '#555555',
      SECONDARY: '#222222',
      TEXT: '#d5d5d5',
      TEXT_ALT: '#000000',
    };

    colorsLight = {
      BACKGROUND: '#ffffff',
      ERROR: '#ff0000',
      GRAY_1: '#707070',
      GRAY_2: '#d6d6d6',
      GRAY_3: '#b0b0b0',
      GRAY_4: '#909091',
      MODAL_BACKDROP_COLOR: '#000000',
      SECONDARY: COLOR_SECONDARY,
      TEXT: '#000000',
      TEXT_ALT: '#ffffff',
    };

    getColors(scheme) {
      return {
        ...(scheme === 'dark' ? this.colorsDark : this.colorsLight),
        DARK: this.colorsDark,
        LIGHT: this.colorsLight,
      };
    }

    appearanceListener() {
      const {
        store: { dispatch, getState },
      } = this.context;

      const {
        settings: { colorScheme: settingsColorScheme },
      } = getState();

      const scheme = Appearance.getColorScheme() || settingsColorScheme || 'light';

      dispatch(setColorSchemeSettings(scheme));

      this.setState({ colorScheme: scheme, colors: this.getColors(scheme) });
    }

    componentDidMount() {
      Appearance.addChangeListener(this.appearanceListener);
    }

    componentWillUnmount() {
      Appearance.removeChangeListener(this.appearanceListener);
    }

    render() {
      const { forwardedRef, ...props } = this.props;
      const { colorScheme, colors } = this.state;

      return (
        <WrappedComponent
          /* eslint-disable-next-line react/jsx-props-no-spreading */
          {...props}
          colorScheme={colorScheme}
          colors={colors}
          ref={forwardedRef}
        />
      );
    }
  }

  WithColorScheme.contextType = ReactReduxContext;

  return React.forwardRef((props, ref) => {
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    return <WithColorScheme {...props} forwardedRef={ref} />;
  });
};

export default withColorScheme;
