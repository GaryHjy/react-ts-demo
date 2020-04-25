import React, { Component } from 'react'
import './index.less';
import NavHeader from '../../components/NavHeader/index';

interface Props {
  history: any
}
class Login extends Component<Props> {
  render () {
    return (
      <div>
        <NavHeader history={this.props.history}>登录</NavHeader>
        登录
      </div>
    )
  }
}

export default Login