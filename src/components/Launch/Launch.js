import React, { useEffect } from 'react';
import FHIR from 'fhirclient';

const Launch = () => {
  useEffect(() => {
    FHIR.oauth2.authorize({
      clientId: 'client_id',
      scope: 'launch patient/*.* openid profile',
      completeInTarget: true,
    });
  });

  return (<div />);
};

export default Launch;
