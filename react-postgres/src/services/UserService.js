import axios from "axios";

export const getUsersList = async () => {
  console.log("Calling getUsersList service");
  const res = await axios.get("/users/teams");
  // console.log('Users data', res)
  // return res.data;
  return res;
};

export const updateUser = async (userObj) => {
  const res = await axios.post("/users/" + userObj.id, userObj);
  console.log("User update data", res);
  return res.data;
};

export const getTeamsList = async () => {
  console.log("Calling getTeamsList service");
  const res = await axios.get("/users/teams_list");
  return res;
};

export const getManagersByTeam = async (data) => {
  console.log("Calling getManagersByTeam service");
  const res = await axios.post("/users/teamwise_managers", data);
  return res;
};
