import { Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import UserAddForm from "./userAddForm";
import { Formik } from "formik";
import * as Yup from "yup";

const UsersAdd = () => {
  const initVal = {
    name: "",
    userType: "",
    team: "",
    manager: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string("Enter name").required("Name is required"),
    userType: Yup.string("Enter user type").required("User type is required"),
    team: Yup.string("Enter team").required("Team is required"),
    manager: Yup.string().when("userType", (userType, schema) => {
      if (
        Array.isArray(userType) &&
        userType.length > 0 &&
        userType[0] === "Manager"
      ) {
        return schema.notRequired();
      }
      return schema.required("Manager is required");
    }),
  });

  const handleSubmit = (values, data) => {
    console.log("Form submitted", values, data);
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
            Add User
          </Typography>
        </Grid>
      </Grid>

      <Formik
        initialValues={initVal}
        validationSchema={validationSchema}
        render={(props) => <UserAddForm {...props} />}
        onSubmit={handleSubmit}
      />
    </Paper>
  );
};

export default UsersAdd;
