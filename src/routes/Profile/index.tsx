import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import { TypeProfile } from '../../store/reducers/profile';
import actions from '../../store/actions/profile';
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

class Profile extends Component<Props, State> {
  render () {
    return (
      <div>
        Profile
      </div>
    )
  }
}

let mapStateToProps = (state: TypeRootState): TypeProfile => state.profile

export default connect(
  mapStateToProps,
  actions
)(Profile)