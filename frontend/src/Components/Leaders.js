import React, { useState, useEffect } from 'react'
import { Typography } from '@mui/material'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import { headers } from './APiHeader';

const Leaders = () => {

  const [members, setMembers] = useState([])
  const d = new Date();
  let year = d.getFullYear();

  useEffect(() => {
    function getBoardMembers() {
      axios.get(`https://localhost:5000/boardMembers/filter?year=${year}`, {headers: headers}).then((res) => {
        console.log(res.data)
        setMembers(res.data)
      }).catch((err) => {
        alert(err.message);
        console.log(err.message);
      })
    }
    getBoardMembers()

  }, [])

  return (
    <div style={{ m: '5px' }} >
      <Typography sx={{ mt: 2 }} variant='h4'>Our Leaders</Typography>
      <Box sx={{ width: '75%', justifyContent: 'center', margin: 'auto', backgroundColor: '#0e0569', mt: 2 }}>
        <Grid sx={{ justifyContent: 'center', margin: 'auto' }} container spacing={1}>
          {members.map((member, index) => (
            <Grid item xs={12} md={8} lg={4}>
              <Card sx={{ maxWidth: 360, mt: 4 }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={member.avatar}
                  alt="Paella dish"
                />
                <CardHeader
                  title={member.designation}
                  subheader={<><p>{member.boardMemberName}</p> <>{member.year}</></>}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

          ))}
        </Grid>
      </Box>

    </div>
  )
}

export default Leaders