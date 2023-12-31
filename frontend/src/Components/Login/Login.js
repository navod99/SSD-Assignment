import { React, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { GoogleLogin } from '@react-oauth/google'
import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { headers } from "../APiHeader";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState();
  const loginnavigate = () => {
    navigate('/adminDashboard')
  }

  const login = () => {
    
    axios.post(`https://localhost:5000/login/${email}`, { password:pwd }, {headers: headers})
      .then((data) => {
        console.log(data);
        if (data.data == 'Invalid') {
          alert('Wrong')
        } else {
          sessionStorage.setItem('role', data.data.role)
          sessionStorage.setItem('mail', data.data.email)
          if (data.data.role) {
            navigate('/adminDashboard');
          } else {
            navigate('/')
          }


        }


      }).catch((err) => {
        console.log(err)
      })
  }

  return (
    <div style={{ backgroundColor: "#0e0569", height: "100vh" }}>
      <Box
        component="span"
        sx={{
          mx: "100px",
          my: "20px",
          transform: "scale(0.8)",
        }}
      >
        <Card sx={{ width: 400, mx: "70%", my: "10%", height: "50%" }}>
          <CardContent>
            <Typography variant="h4">Login</Typography>
          </CardContent>
          <CardContent>
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              sx={{ width: 300 }}
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
            />
          </CardContent>
          <CardContent>
            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              sx={{ width: 300 }}
              value={pwd}
              onChange={(e) => { setPwd(e.target.value) }}
            />
          </CardContent>
          <CardContent>
            <Button variant="contained" color="success" sx={{ width: 300 }} onClick={login} >
              Login
            </Button>
          </CardContent>
          <CardContent>
            <GoogleLogin

              onSuccess={credentialResponse => {
                const token = credentialResponse?.tokenId
                console.log(token)
                loginnavigate();
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </CardContent>
        </Card>

      </Box>
    </div>
  );
};

export default Login;
