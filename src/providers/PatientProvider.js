import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { getDateOfBirth, getName } from '../parsers/patient';

const initialState = {
  name: '',
  dob: '',
  data: null,
  fetching: true,
  error: null,
};

const PatientStateContext = createContext();
const PatientDispatchContext = createContext();

const patientActions = {
  GET_PATIENT_REQUEST: 'GET_PATIENT_REQUEST',
  GET_PATIENT_SUCCESS: 'GET_PATIENT_SUCCESS',
  GET_PATIENT_FAILURE: 'GET_PATIENT_FAILURE',
};

const patientReducer = (state, action) => {
  switch (action.type) {
    case patientActions.GET_PATIENT_REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case patientActions.GET_PATIENT_SUCCESS: {
      return {
        ...state,
        name: getName(action.payload),
        dob: getDateOfBirth(action.payload),
        fetching: false,
      };
    }
    case patientActions.GET_PATIENT_FAILURE: {
      return {
        ...state,
        error: action.payload,
        fetching: false,
      };
    }
    default:
      throw new Error(`Unhandled Patient action type: ${action.type}`);
  }
};

const PatientProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientReducer, initialState);

  return (
    <PatientStateContext.Provider value={state}>
      <PatientDispatchContext.Provider value={dispatch}>
        {children}
      </PatientDispatchContext.Provider>
    </PatientStateContext.Provider>
  );
};

const usePatientState = () => {
  const context = useContext(PatientStateContext);
  if (context === undefined) {
    throw new Error('usePatientState must be used within a PatientProvider');
  }
  return context;
};

const usePatientDispatch = () => {
  const context = useContext(PatientDispatchContext);
  if (context === undefined) {
    throw new Error('usePatientDispatch must be used within a PatientProvider');
  }
  return context;
};

const usePatient = () => [usePatientState(), usePatientDispatch()];

PatientProvider.propTypes = {
  children: PropTypes.any,
};

export {
  PatientProvider,
  patientActions,
  usePatient,
};
