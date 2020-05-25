import React, { useEffect } from 'react';
import { usePatient } from '../../providers/PatientProvider';
import { useFhir } from '../../providers/FhirProvider';
import { getPatient } from '../../actions/patient';

const ClinicianDashboard = () => {
  const [patient, patientDispatch] = usePatient();
  const fhirClient = useFhir();

  useEffect(() => {
    if (fhirClient) {
      getPatient(patientDispatch, fhirClient);
    }
  }, [patientDispatch, fhirClient]);

  return (
    <>
      <h2>{patient.name}</h2>
      <h3>{patient.dob}</h3>
    </>
  );
};

export default ClinicianDashboard;
