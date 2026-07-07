import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const data = await patientService.getById(id);
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);

  if (!patient) return <div>Loading...</div>;

  return (
    <Box>
      <Typography variant="h4">{patient.name}</Typography>
      <Typography>Gender: {patient.gender}</Typography>
      <Typography>SSN: {patient.ssn}</Typography>
      <Typography>Occupation: {patient.occupation}</Typography>
      <Typography>Date of birth: {patient.dateOfBirth}</Typography>
      <Typography variant="h5" sx={{ marginTop: "1em" }}>
        Entries
      </Typography>
      {patient.entries.map((entry) => (
        <Box
          key={entry.id}
          sx={{
            marginTop: "1em",
            padding: "1em",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          <Typography variant="h6">{entry.date}</Typography>
          <Typography>{entry.description}</Typography>
          {entry.diagnosisCodes && (
            <Box sx={{ marginTop: "0.5em" }}>
              <Typography variant="subtitle1">Diagnoses:</Typography>
              <ul>
                {entry.diagnosisCodes.map((code) => {
                  const diagnosis = diagnoses.find((d) => d.code === code);
                  return (
                    <li key={code}>
                      {code} {diagnosis ? diagnosis.name : ""}
                    </li>
                  );
                })}
              </ul>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default PatientPage;
