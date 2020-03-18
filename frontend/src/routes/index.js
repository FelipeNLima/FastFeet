import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '~/pages/SignIn';

import Orders from '~/pages/Orders';
import OrderAdd from '~/pages/Orders/Add';

import Deliveryman from '~/pages/Deliveryman';
import DeliverymanAdd from '~/pages/Deliveryman/Add';
import DeliverymanEdit from '~/pages/Deliveryman/Edit';

import Recipients from '~/pages/Recipients';
import RecipientAdd from '~/pages/Recipients/Add';
import RecipientEdit from '~/pages/Recipients/Edit';

import Problems from '~/pages/problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" exact component={Orders} isPrivate />
      <Route path="/orders/add" exact component={OrderAdd} isPrivate />

      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route path="/deliveryman/add" exact component={DeliverymanAdd} isPrivate />
      <Route path="/deliveryman/edit" exact component={DeliverymanEdit} isPrivate />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/add" exact component={RecipientAdd} isPrivate />
      <Route path="/recipients/edit" exact component={RecipientEdit} isPrivate />

      <Route path="/problems" exact component={Problems} isPrivate />

    </Switch>
  );
}
