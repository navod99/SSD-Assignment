import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from './275370071_766907458022966_8343268332153914462_n.jpg'
import { GoogleLogin } from '@react-oauth/google'


const Login = () => {
    const theme = createTheme();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [toggle, setToggle] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        const body = {
            email: email,
            password: password
        }

        // sessionStorage.setItem('role', "admin")
        //       sessionStorage.setItem('mail',"navod@gmail.com")
        //       if ("admin") {
        //         navigate('/adminDashboard');
        //       } else {
        //         navigate('/')
        //       }
              

        axios.post(`https://localhost:5000/login`, body)
      .then((data) => {
        console.log("data", data);
        if (data.data == 'Invalid') {
          alert('Wrong')
        } else {
          sessionStorage.setItem('role', data.data.role)
          sessionStorage.setItem('mail',data.data.email)
          sessionStorage.setItem('token', data.data.token)
          if (data.data.role) {
            navigate('/adminDashboard');
          } else {
            navigate('/')
          }
          
          
        }
        
        
      }).catch((err) => {
        console.log("error", err)
    })
  }

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={9}
                    sx={{
                        backgroundImage: `url(${Logo})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: '#0e0569',
                        marginTop: '-140px'
                    }}
                />
                <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>


                        <form onSubmit={handleSubmit} >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                valur={password}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    console.log(credentialResponse);
                                    navigate('/adminDashboard')
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </form>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">

                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/registration" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Typography variant="body2" color="text.secondary" align="center" marginTop={5}>
                            {'Copyright © '}
                            <Link color="inherit" >
                                Nilwala Leos
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>)
}

export default Login