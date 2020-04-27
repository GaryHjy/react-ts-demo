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
  homeContainerRef: any
}

class LessonList extends Component<Props> {

  componentDidMount() {
    if (this.props.lessons.list.length === 0) {
      this.props.getLessons()
    }
  }

  render () {
    let start = 0;
    let rem = parseInt(document.documentElement.style.fontSize);
    if (this.props.homeContainerRef.current) {
      let scrollTop = this.props.homeContainerRef.current.scrollTop;
      //slider=160px h1 50 = 210/50=4.2   
      if (scrollTop - 4.2 * rem > 0) {
        start = Math.floor((scrollTop - 4.2 * rem) / (6.5 * rem));// 6.5*50=325
      }
    }
    return (
      <section className="lesson-list">
        <h2><MenuOutlined className="icon" />全部课程</h2>
        <Skeleton loading={this.props.lessons.loading && this.props.lessons.list.length === 0} active>
          {
            this.props.lessons.list.map((lesson: Lesson, index:number) => (
              index >= start && index < start + 5 ? <Link to={{ pathname: `/detail/${lesson._id}`, state: lesson }} key={index}>
                <Card
                  hoverable
                  style={{ width: '100%' }}
                  cover={<img src={lesson.poster} />}
                >
                  <Meta title={lesson.title} description={<span>价格：{lesson.price}</span>} />
                </Card>
              </Link> : <div key={index} style={{ height: `${6.5 * rem}px` }}></div>
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