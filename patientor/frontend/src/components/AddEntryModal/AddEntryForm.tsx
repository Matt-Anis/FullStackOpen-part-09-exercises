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
  Chip,
  Box,
  OutlinedInput,
} from "@mui/material";
import { NewEntry, HealthCheckRating, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "Hospital" | "OccupationalHealthcare";

const entryTypeOptions: { value: EntryType; label: string }[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "Hospital", label: "Hospital" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
];

const healthRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "0 — Healthy" },
  { value: HealthCheckRating.LowRisk, label: "1 — Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "2 — High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "3 — Critical Risk" },
];

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  // Shared base fields
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

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

  const onCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setSelectedCodes(typeof value === "string" ? value.split(",") : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const base = {
      description,
      date,
      specialist,
      diagnosisCodes: selectedCodes.length > 0 ? selectedCodes : undefined,
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

      {/* Date — native date picker */}
      <TextField
        label="Date"
        type="date"
        fullWidth
        required
        InputLabelProps={{ shrink: true }}
        value={date}
        onChange={({ target }) => setDate(target.value)}
        sx={{ marginBottom: 1 }}
      />

      {/* Description */}
      <TextField
        label="Description"
        fullWidth
        required
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        sx={{ marginBottom: 1 }}
      />

      {/* Specialist */}
      <TextField
        label="Specialist"
        fullWidth
        required
        value={specialist}
        onChange={({ target }) => setSpecialist(target.value)}
        sx={{ marginBottom: 2 }}
      />

      {/* Diagnosis codes — multiple select */}
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Diagnosis Codes</InputLabel>
        <Select<string[]>
          multiple
          value={selectedCodes}
          onChange={onCodesChange}
          input={<OutlinedInput label="Diagnosis Codes" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((code) => (
                <Chip key={code} label={code} size="small" />
              ))}
            </Box>
          )}
        >
          {diagnoses.map((d) => (
            <MenuItem key={d.code} value={d.code}>
              {d.code} — {d.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
              <MenuItem key={option.value} value={option.value}>
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
            type="date"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Discharge Criteria"
            fullWidth
            required
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
            required
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
            sx={{ marginBottom: 2 }}
          />
          <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>
            Sick Leave (optional)
          </Typography>
          <TextField
            label="Sick Leave Start"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={sickLeaveStart}
            onChange={({ target }) => setSickLeaveStart(target.value)}
            sx={{ marginBottom: 1 }}
          />
          <TextField
            label="Sick Leave End"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
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
