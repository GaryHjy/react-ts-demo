import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import { TypeProfile } from '../../store/reducers/profile';
import actions from '../../store/actions/profile';
import { RouteComponentProps } from 'react-router-dom';
import './index.less';
import { Descriptions, Button, Alert } from 'antd';
import NavHeader from '../../components/NavHeader';
import LOGIN_TYPES from '../../typings/login-types';

interface State {}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>
type Props = StateProps & DispatchProps & RouteProps & {
  children?: any
}

class Profile extends Component<Props, State> {

  // 组件挂载完成
  async componentDidMount() {
    if (this.props.loginState === LOGIN_TYPES.UN_VALIDATE) {
      // 服务器发请求，获取当前用户状态
      await this.props.validate();
    }

  }

  render() {
    let content;
    if (this.props.loginState === LOGIN_TYPES.UN_VALIDATE) {
      content = null
    } else if (this.props.loginState === LOGIN_TYPES.LOGIN_ED) {
      content = (
        <div className="user-info">
          <Descriptions title="当前用户名">
            <Descriptions.Item label="用户名">小明</Descriptions.Item>
            <Descriptions.Item label="手机号">13131313131</Descriptions.Item>
            <Descriptions.Item label="邮箱">66666@qq.com</Descriptions.Item>
          </Descriptions>
          <Button type="danger">退出登录</Button>
        </div>
      )
    } else {
      content = (
        <>
          <Alert type="warning" message="当前未登录" description="您当前未登录，请选择登录或者注册"></Alert>
          <div style={{ textAlign: "center", padding: ".5rem" }}>
            <Button type="dashed" onClick={() => this.props.history.push('/login')}>登录</Button>
            <Button type="dashed" style={{ marginLeft: ".5rem" }} onClick={() => this.props.history.push('/register')}>注册</Button>
          </div>
        </>
      )
    }
    return (
      <section>
        <NavHeader history={this.props.history}>个人中心</NavHeader>
        {content}
      </section>
    )
  }
}

let mapStateToProps = (state: TypeRootState): TypeProfile => state.profile

export default connect(
  mapStateToProps,
  actions
)(Profile)