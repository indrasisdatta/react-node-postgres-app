import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  teamsListRequest,
  teamwiseManagersRequest,
} from "../../redux/actions/actionCreators";

const UserAddForm = (props) => {
  const {
    values: { name, userType, team, manager },
    errors,
    touched,
    isValid,
    setFieldTouched,
    setFieldValue,
    handleChange,
    handleSubmit,
    // teamsList,
  } = props;
  console.log("UserAddForm props", props);

  const dispatch = useDispatch();

  const teamsList = useSelector(
    (state) => state.userReducer.teamsList?.data?.data
  );

  const managersList = useSelector(
    (state) => state.userReducer.teamwiseManagersList?.data?.data
  );

  useEffect(() => {
    dispatch(teamsListRequest());
  }, []);

  const inputChangeHandler = (e) => {
    console.log("inputChangeHandler", e.target.name, e.target.value);
    // e.persist();
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
    /* When 'team' is selected, reset currently selected 'manager' and fetch new list */
    if (e.target.name === "team") {
      dispatch(teamwiseManagersRequest({ teamId: e.target.value }));
      setFieldValue("manager", "");
      setFieldTouched("manager", true, false);
    }
  };

  console.log("Teamwise managers", managersList);

  return (
    <form //style={{ margin: "1em 1.3em" }}
      onSubmit={handleSubmit}
    >
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField
              label="Name"
              variant="outlined"
              value={name}
              error={touched.name && !!errors.name}
              helperText={touched.name ? errors.name : ""}
              name="name"
              onChange={inputChangeHandler}
            />
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth error={touched.userType && !!errors.userType}>
            <InputLabel id="type-select">Type</InputLabel>
            <Select
              name="userType"
              labelId="type-select"
              onChange={inputChangeHandler}
              value={userType}
              label="Type"
            >
              <MenuItem key="" value="">
                Select user type
              </MenuItem>
              <MenuItem key={"Team Member"} value={"Team Member"}>
                Team Member
              </MenuItem>
              <MenuItem key={"Manager"} value={"Manager"}>
                Manager
              </MenuItem>
            </Select>
            {touched.userType && errors.userType && (
              <FormHelperText>{errors.userType}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth error={touched.team && !!errors.team}>
            <InputLabel id="team-select">Team</InputLabel>
            <Select
              name="team"
              labelId="team-select"
              onChange={inputChangeHandler}
              value={team}
              label="Team"
            >
              <MenuItem key="" value="">
                Select team
              </MenuItem>
              {teamsList &&
                teamsList.map((t) => (
                  <MenuItem key={t.team_id} value={t.team_id}>
                    {t.display_name}
                  </MenuItem>
                ))}
            </Select>
            {touched.team && errors.team && (
              <FormHelperText>{errors.team}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={4}>
          <FormControl fullWidth error={touched.manager && !!errors.manager}>
            <InputLabel id="manager-select">Manager</InputLabel>
            <Select
              name="manager"
              labelId="manager-select"
              onChange={inputChangeHandler}
              value={manager}
              label="Manager"
            >
              <MenuItem key="" value="">
                Select manager
              </MenuItem>
              {managersList &&
                managersList.map((t) => (
                  <MenuItem key={t._id} value={t.display_name}>
                    {t.display_name}
                  </MenuItem>
                ))}
            </Select>
            {touched.manager && errors.manager && (
              <FormHelperText>{errors.manager}</FormHelperText>
            )}
          </FormControl>
        </Grid>
      </Grid>
      <FormControl style={{ marginTop: "1em" }}>
        <Button type="submit" variant="contained" disabled={!isValid}>
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default UserAddForm;
