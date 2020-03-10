import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Orders from '~/pages/Orders';
import NewOrder from '~/pages/Orders/Add';

import Deliveryman from '~/pages/Deliveryman';
import NewDeliveryman from '~/pages/Deliveryman/Add';
import EditDeliveryman from '~/pages/Deliveryman/Edit';

import Recipients from '~/pages/Recipients';
import NewRecipient from '~/pages/Recipients/Add';
import EditRecipient from '~/pages/Recipients/Edit';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/orders/new" component={NewOrder} isPrivate />

      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route path="/deliveryman/new" component={NewDeliveryman} isPrivate />
      <Route path="/deliveryman/edit" component={EditDeliveryman} isPrivate />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/new" exact component={NewRecipient} isPrivate />
      <Route path="/recipients/edit" component={EditRecipient} isPrivate />
    </Switch>
  );
}
