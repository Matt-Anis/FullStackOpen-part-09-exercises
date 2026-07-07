import { useState, SyntheticEvent } from "react";
import {
  TextField,
  Grid,
  Button,
  MenuItem,
  Select,
  InputLabel,
  SelectChangeEvent,
  FormControl,
  Typography,
  Divider,
} from "@mui/material";
import { NewEntry, HealthCheckRating } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const entryTypeOptions: { value: EntryType; label: string }[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

const healthRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
  // Shared base fields
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

  // HealthCheck fields
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(
    HealthCheckRating.Healthy,
  );

  // Hospital fields
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  // OccupationalHealthcare fields
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStart, setSickLeaveStart] = useState("");
  const [sickLeaveEnd, setSickLeaveEnd] = useState("");

  const onTypeChange = (event: SelectChangeEvent<EntryType>) => {
    setEntryType(event.target.value as EntryType);
  };

  const onRatingChange = (event: SelectChangeEvent<number>) => {
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
  };

  const parsedDiagnosisCodes = diagnosisCodes
    ? diagnosisCodes.split(",").map((c) => c.trim())
    : undefined;

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes: parsedDiagnosisCodes,
    };

    switch (entryType) {
      case "HealthCheck":
        onSubmit({ ...base, type: "HealthCheck", healthCheckRating });
        break;
      case "Hospital":
        onSubmit({
          ...base,
          type: "Hospital",
          discharge: { date: dischargeDate, criteria: dischargeCriteria },
        });
        break;
      case "OccupationalHealthcare": {
        const sickLeave =
          sickLeaveStart && sickLeaveEnd
            ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
            : undefined;
        onSubmit({ ...base, type: "OccupationalHealthcare", employerName, sickLeave });
        break;
      }
    }
  };

  return (
    <form onSubmit={addEntry}>
      {/* Entry type selector */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Entry Type</InputLabel>
        <Select<EntryType> value={entryType} label="Entry Type" onChange={onTypeChange}>
          {entryTypeOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Shared base fields */}
      <TextField
        label="Description"
        fullWidth
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Date"
        placeholder="YYYY-MM-DD"
        fullWidth
        value={date}
        onChange={({ target }) => setDate(target.value)}
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Specialist"
        fullWidth
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        sx={{ marginBottom: 1 }}
      />
      <TextField
        label="Diagnosis codes (comma separated)"
        fullWidth
        value={diagnosisCodes}
        onChange={({ target }) => setDiagnosisCodes(target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* --- HealthCheck fields --- */}
      {entryType === "HealthCheck" && (
        <FormControl fullWidth>
          <InputLabel>Health Check Rating</InputLabel>
          <Select<number>
            value={healthCheckRating}
            label="Health Check Rating"
            onChange={onRatingChange}
          >
            {healthRatingOptions.map((option) => (
              <MenuItem key={option.label} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {/* --- Hospital fields --- */}
      {entryType === "Hospital" && (
        <>
          <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
            Discharge
          </Typography>
          <TextField
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
          />
        </>
      )}

      {/* --- OccupationalHealthcare fields --- */}
      {entryType === "OccupationalHealthcare" && (
        <>
          <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
            Sick Leave (optional)
          </Typography>
          <TextField
            label="Sick Leave Start"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Sick Leave End"
            placeholder="YYYY-MM-DD"
            fullWidth
            value={sickLeaveEnd}
            onChange={({ target }) => setSickLeaveEnd(target.value)}
          />
        </>
      )}

      <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
        <Grid size="auto">
          <Button
            color="secondary"
            variant="contained"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid size="auto">
          <Button type="submit" variant="contained">
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddEntryForm;
