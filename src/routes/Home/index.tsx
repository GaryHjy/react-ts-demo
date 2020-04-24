import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import { TypeHome } from '../../store/reducers/home';
import actions from '../../store/actions/home';
import { RouteComponentProps } from 'react-router-dom';
import HomeHeader from './HomeHeader/index';
import './index.less';

interface State {}
// 当前组件有四个属性来源
// 1. mapStateToProps的返回值
// 2. action对象类型
// 3. 来自路由
// 4. 用户传进来的其它属性props

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>
type Props = StateProps & DispatchProps & RouteProps & {
  children?: any
}

class Home extends Component<Props, State> {
  render () {
    return <div>
      <HomeHeader
        setCurrentCategory={this.props.setCurrentCategory}
        currentCategory={this.props.currentCategory} />  
      首页
    </div>
  }
}
let mapStateToProps = (state: TypeRootState):TypeHome => state.home;

export default connect(
  mapStateToProps,
  actions
)(Home);