import React, { Component, ReactNode } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Card } from 'antd';
import './index.less';
import NavHeader from '../../components/NavHeader/index';
import { Lesson } from '@/store/reducers/home';
import { connect } from 'react-redux';
import { getLesson } from '../../api/detail';

const { Meta } = Card;

interface State {
  lesson: Lesson;
}

interface IParams {
  id: string
}
type RouteProps = RouteComponentProps<IParams>
type Props = RouteProps & {
  children?: ReactNode
}

class Detail extends Component<Props, State> {
  state: State = { lesson: { _id: '', title: '', video: '', poster: '', url: '', price: '', category: '' } }

  async componentDidMount() {
    let lesson = this.props.location.state;
    if(!lesson) {
      let id = this.props.match.params.id;
      let result: any = await getLesson(id);
      if (result.code == 0) {
        this.setState({ lesson: result.data })
      }
    } else {
      this.setState({ lesson: {
        ...this.state.lesson,
        ...lesson
      } })
    }
    
  }

  render () {
    let { lesson } = this.state;
    return (
      <>
        <NavHeader history={this.props.history}>课程详情</NavHeader>
        <Card
          hoverable
          style={{ width: '100%' }}
          cover={<video src={lesson.video} controls autoPlay={false} />}
        >
          <Meta title={lesson.title} description={<span>价格：{lesson.price}</span>} />
        </Card>
      </>
    )
  }
}


export default connect()(Detail)