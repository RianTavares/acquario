import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './App';

import Home from './pages/Home';
import Form from './pages/Form';
import Step2 from './pages/Form/Step2';
import Message from './pages/Form/Message';

const Routes = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/formular" component={Form} />
          <Route exact path="/formular/step2" component={Step2} />
          <Route exact path="/formular/step2/message" component={Message} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;