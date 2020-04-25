import React, { Component } from 'react'
import NavHeader from '../../components/NavHeader/index';
import { connect } from 'react-redux';
import actions from '../../store/actions/profile';
import { TypeProfile } from '../../store/reducers/profile';
import { TypeRootState } from '@/store/reducers';
import { RouteComponentProps } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>
type Props = StateProps & DispatchProps & RouteProps & {
  children?: any
}

class Register extends Component<Props> {
  onFinish = (values:any) => {
    console.log(values);
  };

  onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  render () {
    return (
      <div>
        <NavHeader history={this.props.history}>注册</NavHeader>
        <Form
          name="register-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input 
              prefix={<UserOutlined className="site-form-item-icon" />} 
              placeholder="请输入用户名" 
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input 
              prefix={<LockOutlined className="site-form-item-icon" />} 
              type="password"
              placeholder="请输入密码"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              注册
             </Button>
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