import { useState, useEffect, forwardRef, React } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";
const HomeProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/project")
      .then((res) => {
        setProjects(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div style={{ backgroundColor: '#373e98',padding:'2px'}}>
    <Container >
        {projects.map((pro) => (
          <Card sx={{ margin: '4px', height: '400px', backgroundColor:'#0e0569' }}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <CardMedia
                  component="img"
                  src={pro && pro.avatar}
                  alt="Live from space album cover"
                  sx={{ width:'600px',height:'500px'}}
                />
              </Grid>
              <Grid item xs={8} paddingRight={2} >
                <Typography variant="h2" sx={{ textAlign: 'center', mt: '35px',textDecoration:'bold' }} color='white' >
                  {pro.name}
                </Typography>
                <Typography variant="h6" sx={{ textAlign: 'justify', mt: '25px',ml: '20px' }} color='white' paragraph>
                   {pro.Description}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
      </Container>
    </div>
  );
};

export default HomeProjects;
