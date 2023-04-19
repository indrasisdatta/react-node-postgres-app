import { 
    Grid, 
    Paper, 
    Typography 
} from '@mui/material'
import React from 'react'

const Home = () => {
  return (
    <Grid container justifyContent="space-between">
        <Grid item xs={12}>
            <Paper elevation={8} xs={6} style={{
                padding: 16,
            }}>                    
                <Typography variant="h5" component="h5" mb={3}>Home</Typography> 
            </Paper>
        </Grid>
    </Grid>
  )
}

export default Home
