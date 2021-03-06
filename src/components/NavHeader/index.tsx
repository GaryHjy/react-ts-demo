import React, { Component } from 'react';
import './index.less';
import { LeftOutlined } from '@ant-design/icons';

interface Props {
  history: any
  children: any
}
export default function NavHeader(props: Props) {
  return (
    <div className="nav-header">
      <LeftOutlined className="return-icon" onClick={() => { props.history.goBack() }} />
      {props.children}
    </div>
  );
};