import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, Button } from "@mui/material";
import { Patient, Diagnosis, NewEntry, Entry } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!id) return;
    const fetchPatient = async () => {
      const data = await patientService.getById(id);
      setPatient(data);
    };
    void fetchPatient();
  }, [id]);

  const openModal = () => setModalOpen(true);
  const closeModal = () => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    if (!id || !patient) return;
    try {
      const addedEntry: Entry = await patientService.addEntry(id, values);
      setPatient({ ...patient, entries: patient.entries.concat(addedEntry) });
      setModalOpen(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Unknown error");
      }
    }
  };

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
          <EntryDetails entry={entry} diagnoses={diagnoses} />
        </Box>
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
      <Button variant="contained" sx={{ marginTop: "1em" }} onClick={openModal}>
        Add New Entry
      </Button>
    </Box>
  );
};

export default PatientPage;
