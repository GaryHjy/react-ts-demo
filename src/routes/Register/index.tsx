import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader/index';
import { connect } from 'react-redux';
import actions from '../../store/actions/profile';
import { TypeProfile } from '../../store/reducers/profile';
import { TypeRootState } from '@/store/reducers';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons';
import './index.less';
import { TypeAnyObject } from '@/typings/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>
type Props = StateProps & DispatchProps & RouteProps & {
  children?: any
}

class Register extends Component<Props> {
  onFinish = (values: TypeAnyObject) => {
    this.props.register(values);
  };

  render () {
    return (
      <div>
        <NavHeader history={this.props.history}>注册</NavHeader>
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

          <Form.Item
            name="email"
            rules={[{ required: true, message: '请输入邮箱' }]}
          >
            <Input
              prefix={<MailOutlined />}
              type="password"
              placeholder="请输入邮箱"
            />
          </Form.Item>

          <Form.Item
            name="phone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input
              prefix={<MobileOutlined />}
              type="phone"
              placeholder="请输入手机号"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              注册
             </Button>
             或者<Link to="/login">去登陆</Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

let mapStateToProps = (state: TypeRootState):TypeProfile => state.profile;
export default connect(
  mapStateToProps,
  actions
)(Register)