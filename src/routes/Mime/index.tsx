import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import { TypeMime } from '../../store/reducers/mime';
import actions from '../../store/actions/mime';
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

class Mime extends Component<Props, State> {
  render () {
    return (
      <div>
        Mime
      </div>
    )
  }
}

let mapStateToProps = (state: TypeRootState): TypeMime => state.mime

export default connect(
  mapStateToProps,
  actions
)(Mime)