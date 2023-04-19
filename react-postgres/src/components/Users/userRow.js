import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ExpandMore } from "@mui/icons-material";

const UserRow = ({ user, teams, managers, onEditClick }) => {
  return (
    <Accordion data-testid={`user-row-${user.id}`}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            {user.empName}
          </Grid>
          <Grid item xs={3}>
            {user.manager ? "Team Member" : "Manager"}
          </Grid>
          <Grid item xs={4}>
            {user.manager && <span>Reports to {user.manager}</span>}
          </Grid>
          <Grid item xs={1}>
            <EditIcon
              data-testid={`edit-btn-${user.id}`}
              fontSize="small"
              onClick={(e) => onEditClick(e, user)}
              className={!user.manager ? "disabled" : ""}
            ></EditIcon>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="p" component="p" mb={1}>
          Assigned to: {user.team.map((t) => t.name).join(", ")}.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserRow;
