import React, { Component } from 'react'
import { connect } from 'react-redux';
import { TypeRootState } from '../../store/reducers';
import { TypeProfile } from '../../store/reducers/profile';
import actions from '../../store/actions/profile';
import { RouteComponentProps } from 'react-router-dom';
import './index.less';
import { Descriptions, Button, Alert, Upload, message } from 'antd';
import NavHeader from '../../components/NavHeader';
import LOGIN_TYPES from '../../typings/login-types';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

interface State {}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof actions;
interface IParams {}
type RouteProps = RouteComponentProps<IParams>
type Props = StateProps & DispatchProps & RouteProps & {
  children?: any
}

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('请上传JPG/PNG格式文件!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片不能大于2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Profile extends Component<Props, State> {

  state = {
    loading: false,
    imageUrl: ''
  }
  // 组件挂载完成
  async componentDidMount() {
    // 服务器发请求，获取当前用户状态
    await this.props.validate();
  }

  handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      
      let {data, code, error} = info.file.response;
      if (code === 0) {
        this.setState({
          loading: false,
          imageUrl: data
        }, () => this.props.changeAvatar(data))
      } else {
        message.error(error);
      }
    }
  }
  render() {
    let { user } = this.props;
    let content;
    if (this.props.loginState === LOGIN_TYPES.LOGIN_ED) {
      const uploadButton = (
        <div>
          {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const imageUrl = this.state.imageUrl || user.avatar;
      content = (
        <div className="user-info">
          <Descriptions title="当前用户名">
            <Descriptions.Item label="头像">
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://localhost:9000/api/uploadAvatar"
                data={{ userId: user._id}}
                withCredentials={true}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
              >
                {
                  imageUrl ?
                    (<img src={imageUrl} alt="avatar" style={{ width: '100%' }} />)
                    :
                    uploadButton
                }
              </Upload>
            </Descriptions.Item>
            <Descriptions.Item label="用户名">{ user.username }</Descriptions.Item>
            <Descriptions.Item label="手机号">{ user.phone }</Descriptions.Item>
            <Descriptions.Item label="邮箱">{ user.email }</Descriptions.Item>
          </Descriptions>
          <Button type="danger"
            onClick={async event => {
              await this.props.logout();
              this.props.history.push('/login');
            }}
          >
            退出登录
          </Button>
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