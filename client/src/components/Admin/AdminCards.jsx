import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



export default function AdminCard(props) {

    
  return (
    <React.Fragment>
    <CardContent style={{backgroundColor: '#ff5722', width:375, height:250, boxShadow:"4px 5px grey", borderRadius:10}}>

      <Typography variant="h3" component="div" style={{color:'white'}}>
        {props.number}
      </Typography>
      
      <Typography variant="h6" component="div" style={{color:'white'}} >
        {props.title}
      </Typography>
      <CardActions>
      <Button size="small" style={{color:'white'}}>View All</Button>
    </CardActions>
    </CardContent>

  </React.Fragment>
  );
}