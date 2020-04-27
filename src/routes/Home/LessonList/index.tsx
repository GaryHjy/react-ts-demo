import React, { Component, ReactNode } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Lessons, Lesson } from '@/store/reducers/home'
import { Link } from 'react-router-dom'
import { Card, Button, Alert, Skeleton } from 'antd';
import './index.less';

const { Meta } = Card;

interface Props {
  children?:ReactNode
  lessons: Lessons
  getLessons: any
}

class LessonList extends Component<Props> {

  componentDidMount() {
    if (this.props.lessons.list.length === 0) {
      this.props.getLessons()
    }
  }

  render () {
    return (
      <section className="lesson-list">
        <h2><MenuOutlined className="icon" />全部课程</h2>
        <Skeleton loading={this.props.lessons.loading && this.props.lessons.list.length === 0} active>
          {
            this.props.lessons.list.map((lesson: Lesson) => (
              <Link to={`/detail/${lesson._id}`} key={lesson._id}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<img src={lesson.poster} />}
                >
                  <Meta title={lesson.title} description={<span>价格：{lesson.price}</span>} />
                </Card>,
              </Link>
            ))
          }
        </Skeleton>
        {
          this.props.lessons.hasMore ? (
            <Button
              loading={this.props.lessons.loading}
              onClick={this.props.getLessons}
              type="dashed"
              style={{ width: '100%' }}
            >
              {!this.props.lessons.loading && '加载更多'}
            </Button>
          ) : <Alert style={{textAlign:'center'}} type="warning" message="我是有底线的" />
        }
        
      </section>
    )
  }
}

export default LessonList