import { LoginOutlined } from '@mui/icons-material'
import {
    Alert, 
    Button, 
    FormControl, 
    Grid, 
    Paper, 
    Snackbar, 
    TextField, 
    Typography 
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userLoginRequest } from '../../redux/actions/actionCreators';
import { useLocation, useNavigate } from 'react-router-dom';

const defaultFormObj = {
    username: {value: '', errorMessage: ''},
    password: {value: '', errorMessage: ''},
};

const loginFormReducer = (state = defaultFormObj, action) => {
    switch (action.type) {
        case 'UPDATE_FORM_INPUT':
            return action.payload;
        case 'UPDATE_FORM_ERROR':
            return state;
        default: 
            return state;
    }
}

const Login = () => {

    const [formInput, setFormInput] = useReducer(loginFormReducer, defaultFormObj);
    const [ openAlert, setOpenAlert ] = useState(false);
    const authState = useSelector(state => state.auth.authUser);
    const navigate = useNavigate();
    const location = useLocation();

    // console.log('useLocation obj', location)

    const dispatch = useDispatch();

    useEffect(() => {
        console.log('Watch for authState', authState);
        if (!!authState.error) {
            let tempObj = {
                ...formInput,
                password : {
                    ...formInput.password,
                    errorMessage: authState.error
                }
            }
            setFormInput({
                type: 'UPDATE_FORM_INPUT',
                payload: tempObj
            });
        } else if (!!authState.token) {
            let redirectUrl = location.state?.from?.pathname ?? '/dashboard';
            navigate(redirectUrl);
        }
    }, [authState]);

    const handleCloseAlert = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenAlert(false);
    }

    const hasError = () => {
        let check = formInput && 
            (
                formInput.username.errorMessage || formInput.password.errorMessage || 
                !formInput.username.value || !formInput.password.value
            );
        // console.log('hasError check', check)
        return check;
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log('Login submit called', formInput);
        let checkError = hasError();
        if (checkError) {
            return false;
        }
        let postData = {
            username: formInput.username.value,
            password: formInput.password.value
        }
        dispatch(userLoginRequest(postData));
    }

    const handleInputChange = (e) => {
        let err = '';
        if (!e.target.value) {
            let str = e.target.name;
            let field = str.charAt(0).toUpperCase() + str.slice(1);
            err = `${field} is required`;
        } else {
            err = '';
        }
        let tempObj = {
            ...formInput,
            [e.target.name] : {
                ...formInput[e.target.name],
                value: e.target.value,
                errorMessage: err
            }
        }
        setFormInput({
            type: 'UPDATE_FORM_INPUT',
            payload: tempObj
        });
    }

  return (
    <Grid container justifyContent="space-between">
        {/* <Snackbar 
          open={openAlert} 
          autoHideDuration={4000} 
          onClose={handleCloseAlert} 
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
            
          </Alert>
        </Snackbar> */}
        <Grid item xs={5}>
            <Paper elevation={8} xs={6} style={{
                padding: 16,
            }}>                    
                <Typography variant="h5" component="h5" mb={3}>Login to your account</Typography>                
                <form onSubmit={handleLogin}>
                    <FormControl fullWidth spacing={3} sx={{mb: 2}}>
                        <TextField
                            id="outlined-basic"
                            label="Username"
                            name="username"
                            variant="outlined"
                            value={formInput.username.value}
                            onChange={handleInputChange} 
                            error={formInput.username.errorMessage !== ''} 
                            helperText={formInput.username.errorMessage} 
                        />
                    </FormControl>
                    <FormControl fullWidth spacing={3} sx={{mb: 2}}>
                        <TextField
                            id="outlined-basic"
                            label="Password"
                            name="password"
                            variant="outlined"
                            type="password"
                            value={formInput.password.value}
                            onChange={handleInputChange}
                            error={formInput.password.errorMessage !== ''} 
                            helperText={formInput.password.errorMessage}
                        />
                    </FormControl>               
                    <Button type="submit" variant="contained" 
                        disabled={hasError()}
                    > 
                        <LoginOutlined /> &nbsp; Login
                    </Button>    
                </form>            
            </Paper>
        </Grid>
        <Grid item xs={6}>
            <Paper elevation={8} xs={6} style={{ padding: 16 }}>                    
                <Typography variant="h5" component="h5" mb={3}>Sign up for new account</Typography>  
            </Paper>
        </Grid>
    </Grid>
  )
}

export default Login
