import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

import smart from 'fhirclient';

const context = {
  client: null,
  setClient: (client) => {
    context.client = client;
  },
};

export const FhirContext = createContext(context);

const FhirProvider = ({ children }) => {
  const [fhirClient, setFhirClient] = useState({
    client: null,
    error: null,
  });

  let content = null;

  if (fhirClient.client) {
    content = children;
  }

  if (!fhirClient.client) {
    smart.oauth2.ready()
      .then((client) => setFhirClient({
        client,
        error: null,
      }))
      .catch((error) => setFhirClient({
        client: null,
        error,
      }));
    content = (<h1>{'Loading...'}</h1>); // Loading Component
  }

  if (fhirClient.error) {
    content = fhirClient.error.message;
  }

  return (
    <FhirContext.Provider value={{
      fhirClient,
      setFhirClient,
    }}
    >
      {content}
    </FhirContext.Provider>
  );
};

const useFhir = () => {
  const fhirContext = useContext(FhirContext);
  if (fhirContext === undefined) {
    throw new Error('useFhir must be used within a FhirProvider');
  }
  return fhirContext.fhirClient.client;
};

FhirProvider.propTypes = {
  children: PropTypes.any,
};

export {
  FhirProvider,
  useFhir,
};
