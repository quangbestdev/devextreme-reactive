import * as React from 'react';
import * as PropTypes from 'prop-types';
import { AUTO_HEIGHT } from '@devexpress/dx-scheduler-core';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  container: {
    overflowY: 'auto',
  },
  stickyHeader: {
    top: 0,
    zIndex: 1,
    tableLayout: 'fixed',
    position: 'sticky',
    overflow: 'visible',
    background: theme.palette.background.paper,
  },
  main: {
    position: 'relative',
  },
});

export class HorizontalViewLayoutBase extends React.PureComponent {
  render() {
    const {
      dayScaleComponent: Navbar,
      timeTableComponent: Main,
      classes,
      layoutRef,
      layoutHeaderRef,
      height,
      className,
      style,
      ...restProps
    } = this.props;

    const containerStyle = height === AUTO_HEIGHT ? { height: '100%' } : { height: `${height}px` };
    return (
      <Grid
        ref={layoutRef}
        className={classNames(classes.container, className)}
        container
        direction="column"
        wrap="nowrap"
        style={{ ...containerStyle, ...style }}
        {...restProps}
      >
        <Grid
          ref={layoutHeaderRef}
          item
          className={classes.stickyHeader}
        >
          <Navbar />
        </Grid>
        <Grid
          item
          className={classes.main}
        >
          <Main />
        </Grid>
      </Grid>
    );
  }
}

HorizontalViewLayoutBase.propTypes = {
  // oneOfType is a workaround because withStyles returns react object
  dayScaleComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  timeTableComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  classes: PropTypes.object.isRequired,
  layoutRef: PropTypes.object.isRequired,
  layoutHeaderRef: PropTypes.object.isRequired,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

HorizontalViewLayoutBase.defaultProps = {
  className: undefined,
  style: null,
};

export const HorizontalViewLayout = withStyles(styles, { name: 'HorizontalViewLayout' })(HorizontalViewLayoutBase);