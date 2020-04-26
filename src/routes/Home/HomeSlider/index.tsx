import React, { Component, ReactNode } from 'react'
import './index.less'
import { Carousel } from 'antd';
import { Slider } from '../../../store/reducers/home';

interface Props {
  children?:ReactNode
  sliders?: Array<Slider>
  getSliders: any
}
class HomeSlider extends Component<Props> {
  componentDidMount() {
    if(this.props.sliders.length === 0) {
      this.props.getSliders()
    }
  }
  render () {
    return (
      <Carousel>
        {
          this.props.sliders.map((item: Slider, index:number) => (
            <div key={index}>
              <img src={item.url} />
            </div>
          ))
        }
      </Carousel>
    )
  }
}

export default HomeSlider