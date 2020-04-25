import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader/index';

interface Props {
  history: any
}
class Register extends Component<Props> {
  render () {
    return (
      <div>
        <NavHeader history={this.props.history}>注册</NavHeader>
        注册
      </div>
    )
  }
}

export default Register