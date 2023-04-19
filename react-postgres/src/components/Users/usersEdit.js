import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { ExpandMore } from "@mui/icons-material";

const UsersEdit = ({ user, teams, managers, onSaveClick }) => {
  const defaultUserObj = {
    empName: "",
    isManager: false,
    manager: "",
    team: [],
    reportingManager: null,
  };

  const errObj = {
    empName: "",
    isManager: "",
    manager: "",
    team: "",
  };

  const [userObj, setUserObj] = useState(defaultUserObj);
  const [errorObj, setErrorObj] = useState(errObj);

  const handleChange = (e, field) => {
    // console.log("handleChange", field, e);
    const tempObj = {};
    switch (field) {
      case "name":
        tempObj.empName = e.target.value;
        break;
      case "userType":
        tempObj.userType = e.target.value;
        break;
      case "team":
        tempObj.team = e.target.value;
        break;
      default:
    }
    console.log("Update state obj", tempObj);
    setUserObj((prevState) => ({ ...prevState, ...tempObj }));
  };

  const handleSubmit = () => {
    const tempErr = { ...errObj };
    let hasError = false;
    if (!userObj.empName) {
      tempErr.empName = "Name is required";
      hasError = true;
    }
    if (!userObj.team || userObj.team.length === 0) {
      tempErr.team = "Associate should be assigned to at least 1 team";
      hasError = true;
    }
    console.log("tempErr", tempErr);
    if (Object.keys(tempErr).length > 0) {
      setErrorObj(tempErr);
    }
    if (!hasError) {
      onSaveClick(user, userObj);
    }
  };

  useEffect(() => {
    console.log("useEffect check...................");
    const tempUserObj = {};
    tempUserObj.empName = user.empName;
    tempUserObj.team = user.team.map((t) => t.id);
    tempUserObj.manager = user.manager;
    tempUserObj.isManager = user.manager ? true : false;

    let repManager = managers.find((mng) => {
      return user.manager === mng.empName;
    });
    tempUserObj.reportingManager = repManager ?? null;
    setUserObj(tempUserObj);
  }, []);

  return (
    <Accordion defaultExpanded={true} data-testid={`user-edit-${user.id}`}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={userObj.empName}
                onChange={(e) => handleChange(e, "name")}
                error={errorObj.empName !== ""}
                helperText={errorObj.empName}
                name="empName"
              />
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="type-select">Type</InputLabel>
              <Select
                name="userType"
                data-testid="userType"
                labelId="type-select"
                value={userObj.manager ? "Team Member" : "Manager"}
                onChange={(e) => handleChange(e, "userType")}
                label="Type"
              >
                {["Team Member", "Manager"].map((t) => (
                  <MenuItem key={t} value={t}>
                    {t}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="manager-select">Reports to</InputLabel>
              <Select
                labelId="manager-select"
                data-testid="reportsTo"
                value={userObj.manager ?? ""}
                onChange={(e) => handleChange(e, "manager")}
                name="manager"
                disabled
                label="Reports to"
              >
                {managers.map((t) => (
                  <MenuItem key={t.empName} value={t.empName}>
                    {t.empName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <SaveIcon
              fontSize="small"
              data-testid="save-btn"
              onClick={handleSubmit}
            ></SaveIcon>
          </Grid>
        </Grid>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container>
          <Grid item xs={6}>
            <FormControl fullWidth error={errorObj.team !== ""}>
              <InputLabel id="team-select">Assigned to</InputLabel>
              <Select
                labelId="team-select"
                data-testid="assignedTo"
                multiple
                value={userObj.team ?? ""}
                onChange={(e) => handleChange(e, "team")}
                error={errorObj.team !== ""}
                name="team"
                label="Assigned to"
              >
                {userObj &&
                  userObj.reportingManager &&
                  userObj.reportingManager.team.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.name}
                    </MenuItem>
                  ))}
              </Select>
              <FormHelperText>{errorObj.team}</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default UsersEdit;
