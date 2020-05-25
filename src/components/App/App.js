import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { FhirProvider } from '../../providers/FhirProvider';
import { PatientProvider } from '../../providers/PatientProvider';

import Launch from '../Launch/Launch';
import ClinicianDashboard from '../ClinicianDashboard/ClinicianDashboard';

import './App.scss';

const App = () => (
  <div className="container">
    <FhirProvider>
      <PatientProvider>
        <Router>
          <Switch>
            <Route path="/launch">
              <Launch />
            </Route>
            <Route path="/">
              <ClinicianDashboard />
            </Route>
          </Switch>
        </Router>
      </PatientProvider>
    </FhirProvider>
  </div>
);

export default App;
