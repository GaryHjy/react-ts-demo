import React, { Component } from 'react'
import './index.less';
import NavHeader from '../../components/NavHeader/index';
import { connect } from 'react-redux';
import actions from '../../store/actions/profile';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { TypeRootState } from '@/store/reducers';
import { TypeProfile } from '../../store/reducers/profile';
import { RouteComponentProps, Link } from 'react-router-dom';
import { TypeAnyObject } from '@/typings/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>
type Props = StateProps & DispatchProps & RouteProps & {
  children?: any
}
class Login extends Component<Props> {
  onFinish = (values: TypeAnyObject) => {
    this.props.login(values);
  }
  render () {
    return (
      <div>
        <NavHeader history={this.props.history}>登录</NavHeader>
        <Form
          name="register-form"
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="请输入用户名"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              登录
             </Button>
             或者<Link to="/register">去注册</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

let mapStateToProps = (state: TypeRootState):TypeProfile  => state.profile;

export default connect(
  mapStateToProps,
  actions
)(Login)