import { Entry, Diagnosis } from "../../types";
import { Typography, Box } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const DiagnosisList = ({
  codes,
  diagnoses,
}: {
  codes: string[];
  diagnoses: Diagnosis[];
}) => (
  <ul>
    {codes.map((code) => {
      const diagnosis = diagnoses.find((d) => d.code === code);
      return (
        <li key={code}>
          {code} {diagnosis ? diagnosis.name : ""}
        </li>
      );
    })}
  </ul>
);

const healthRatingColor = (rating: number): string => {
  switch (rating) {
    case 0:
      return "green";
    case 1:
      return "yellow";
    case 2:
      return "orange";
    case 3:
      return "red";
    default:
      return "grey";
  }
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">{entry.date}</Typography>
            <LocalHospitalIcon />
          </Box>
          <Typography sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          <Typography>
            Discharge: {entry.discharge.date} — {entry.discharge.criteria}
          </Typography>
          <Typography variant="body2">
            diagnose by {entry.specialist}
          </Typography>
          {entry.diagnosisCodes && (
            <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          )}
        </Box>
      );
    case "OccupationalHealthcare":
      return (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">{entry.date}</Typography>
            <WorkIcon />
            <Typography sx={{ fontStyle: "italic" }}>
              {entry.employerName}
            </Typography>
          </Box>
          <Typography sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          {entry.sickLeave && (
            <Typography>
              Sick leave: {entry.sickLeave.startDate} to{" "}
              {entry.sickLeave.endDate}
            </Typography>
          )}
          <Typography variant="body2">
            diagnose by {entry.specialist}
          </Typography>
          {entry.diagnosisCodes && (
            <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          )}
        </Box>
      );
    case "HealthCheck":
      return (
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="subtitle1">{entry.date}</Typography>
            <LocalHospitalIcon />
          </Box>
          <Typography sx={{ fontStyle: "italic" }}>
            {entry.description}
          </Typography>
          <FavoriteIcon
            sx={{ color: healthRatingColor(entry.healthCheckRating) }}
          />
          <Typography variant="body2">
            diagnose by {entry.specialist}
          </Typography>
          {entry.diagnosisCodes && (
            <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          )}
        </Box>
      );
    default:
      const _exhaustiveCheck: never = entry;
      return _exhaustiveCheck;
  }
};

export default EntryDetails;
