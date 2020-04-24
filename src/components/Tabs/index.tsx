import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './index.less';

class Tabs extends Component {
  render () {
    return (
      <footer>
        <NavLink to="/" exact>
          <span>首页</span>
        </NavLink>
        <NavLink to="/mine">
          我的课程
        </NavLink>
        <NavLink to="/profile">
          个人中心
        </NavLink>
      </footer>
    )
  }
}

export default Tabs