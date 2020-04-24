import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './assets/common.less';
import { ConnectedRouter } from 'connected-react-router';
import history from './store/history';
import Home from './routes/Home';
import Mine from './routes/Mine';
import Profile from './routes/Profile';
import Tabs from './components/Tabs/index';

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <main className="main-container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/mine" exact component={Mine} />
          <Route path="/profile" exact component={Profile} />
          <Redirect to="/" />
        </Switch>
      </main>
      <Tabs />
    </ConnectedRouter>
  </Provider>
), document.getElementById('root'));
