import {
  Alert,
  Button,
  Grid,
  Paper,
  Skeleton,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USERS_LIST_REQUEST } from "../../redux/actions/action";
import { getUsersList, updateUser } from "../../services/UserService";
import UserRow from "./userRow";
import UsersEdit from "./usersEdit";
import { NavLink } from "react-router-dom";

const UsersList = () => {
  const usersList = useSelector((state) => state.userReducer.usersList);
  // console.log('usersList reducer ---> ', usersList)

  const dispatch = useDispatch();

  const [originalUsers, setOriginalUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [managers, setManagers] = useState([]);
  const [loadData, setLoadData] = useState(1);
  const [openSuccessMsg, setOpenSuccessMsg] = useState(false);

  // useEffect(() => {
  //   if (loadData === 1) {
  //     dispatch({ type: USERS_LIST_REQUEST, payload: {'q': 'test'}})
  //     getUsers();
  //     setLoadData(0);
  //   }
  // }, [loadData]);

  /* Initial API call on page load */
  useEffect(() => {
    dispatch({ type: USERS_LIST_REQUEST, payload: { q: "test" } });
  }, []);

  /* Update users and related states every time API response is received */
  useEffect(() => {
    console.log("usersList.loading dependency noted in useEffect", usersList);
    if (!usersList.loading) {
      const apiData = usersList.data;

      /* Original list is maintained and users list is user for display edit/view toggle */
      setUsers(apiData.data);
      setOriginalUsers(apiData.data);
      /* Filter out managers from users list */
      const managersData = apiData.data.filter((usr) => !usr.manager);
      setManagers(managersData);
      const teamsData = [];
      /* Filter out teams from manager array */
      managersData.map((mng) => {
        mng.team.map((mngTeam) => {
          let existingTeam = teamsData.find((team) => team.id == mngTeam.id);
          // console.log('Existing team for mng', mngTeam.id, teamsData, existingTeam);
          if (!existingTeam) {
            teamsData.push(mngTeam);
          }
        });
      });
      // console.log('teamsData: ', teamsData)
      setTeams(teamsData);
    } else {
      setUsers([]);
      setOriginalUsers([]);
      setManagers([]);
      setTeams([]);
    }
  }, [usersList.loading]);

  const onEditClick = (e, user) => {
    console.log("onEditClick", e, user);
    let tempUsers = JSON.parse(JSON.stringify(originalUsers));
    tempUsers.map((usr) => {
      if (usr.id === user.id) {
        usr.isEditing = true;
      } else {
        usr.isEditing = false;
      }
    });
    setUsers(tempUsers);
  };

  const onSaveClick = async (user, userObj) => {
    console.log("onSaveClick", user, userObj);

    /* API call to save data */
    let apiResp = await updateUser({ ...user, ...userObj });
    console.log("apiResp", apiResp);

    if (apiResp.status === 1) {
      setOpenSuccessMsg(true);
      // setLoadData(1);
      dispatch({ type: USERS_LIST_REQUEST, payload: { q: "test" } });
    }
  };

  const handleCloseSuccessMsg = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccessMsg(false);
  };

  return (
    <Paper
      elevation={8}
      style={{
        padding: 16,
      }}
    >
      <Grid container justifyContent="space-between">
        <Grid item>
          <Typography variant="h5" component="h5" mb={3}>
            Users list
          </Typography>
        </Grid>
        <Snackbar
          open={openSuccessMsg}
          autoHideDuration={4000}
          onClose={handleCloseSuccessMsg}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSuccessMsg}
            severity="success"
            sx={{ width: "100%" }}
          >
            Data saved successfully.
          </Alert>
        </Snackbar>
        <Grid item>
          <NavLink to="/users/add">
            <Button variant="contained">Add user</Button>
          </NavLink>
        </Grid>
      </Grid>

      {users.length > 0 ? (
        <div data-testid="user-list">
          {users.map((user, idx) => {
            return user.hasOwnProperty("isEditing") && user.isEditing ? (
              <UsersEdit
                key={user.id}
                user={user}
                teams={teams}
                managers={managers}
                onSaveClick={onSaveClick}
              />
            ) : (
              <UserRow
                key={user.id}
                user={user}
                teams={teams}
                managers={managers}
                onEditClick={onEditClick}
              />
            );
          })}
        </div>
      ) : (
        <Box sx={{ pt: 0.5 }}>
          <Skeleton variant="rectangle" height={"70vh"} width="100%" />
        </Box>
      )}
    </Paper>
  );
};

export default UsersList;
