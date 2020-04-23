import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import { TypeMine } from '../../store/reducers/mine';
import actions from '../../store/actions/mine';
import { RouteComponentProps } from 'react-router-dom';
import './index.less';

interface State {}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>
type Props = StateProps & DispatchProps & RouteProps & {
  children?: any
}

class Mine extends Component<Props, State> {
  render () {
    return (
      <div>
        Mine
      </div>
    )
  }
}

let mapStateToProps = (state: TypeRootState): TypeMine => state.mine

export default connect(
  mapStateToProps,
  actions
)(Mine)