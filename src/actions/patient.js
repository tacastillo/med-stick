/* eslint-disable import/prefer-default-export */

import { patientActions } from '../providers/PatientProvider';

const getPatient = async (dispatch, client) => {
  dispatch({ type: patientActions.GET_PATIENT_REQUEST });
  try {
    const data = await client.patient.read();
    dispatch({ type: patientActions.GET_PATIENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: patientActions.GET_PATIENT_FAILURE, payload: error });
  }
};

export {
  getPatient,
};
