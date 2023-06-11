import * as React from 'react';
import {useState} from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import '../App.css'
import {

  Link,

} from 'react-router-dom';

import Modal from '../Modal';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}




export default function Categories(props) {

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (subcat) =>{

    if (checkedItems.includes(subcat)) {
      setCheckedItems(checkedItems.filter((i) => i !== subcat));
    } else {
      setCheckedItems([...checkedItems, subcat]);
    }

    
    
  }

  const [SubmitBtnState, setSubmitBtnState] = useState(false);
  const [LoginBtnState, setLoginBtnState] = useState(true);

  const handleSubmit = (e) => {

    if(checkedItems.length>2){
      e.preventDefault();
      props.sendCategories(checkedItems);
      setSubmitBtnState(!SubmitBtnState)
      setLoginBtnState(!LoginBtnState)
      setModalState2(true)
      
    }else{
      setModalState(true)
    }

  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [modalState, setModalState] = useState(false);
  const modalClose = () => {
    setModalState(false);
  };

  
  const [modalState2, setModalState2] = useState(false);
  const modalClose2 = () => {
    setModalState2(false);
  };


 
  return (<>

  <Modal errorTitle={"Cannot Submit Categories"} errorMessage = {"You must choose atleast 3 Categories"} open={modalState} onClose={modalClose} />
  <Modal errorTitle={"Registration Successful!"} errorMessage = {"Kindly Login to Continue"} open={modalState2} onClose={modalClose2} />
    <Box
      sx={{ flexGrow: 2, bgcolor: 'background.paper', display: 'flex', height: 500, borderRadius:5, width:900}}
      className='categories-box'
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
        className='tabs-width'
      >


        {props.categories.map(category => (

          <Tab className='tab-text' label={category.category} />

        ))}

      </Tabs>

      {props.categories.map((category, index) => {
        return <TabPanel value={value} index={index}><FormGroup>

          <Grid container spacing={2}>
            {category.subCategory.map((subcat, index) => (

              <Grid item xs={4} className='grid-items'>
                <FormControlLabel key={index} control={<Checkbox checked={checkedItems.includes(subcat)} />}  onChange={()=>handleCheck(subcat)} label={subcat}  />
              </Grid>

            ))}
          </Grid>
        </FormGroup>
        </TabPanel>


      })}

    </Box>
    
    <button className='submit-btn' disabled={SubmitBtnState} onClick={handleSubmit}  >Submit</button>
    <Link to="/brand-login"><button disabled={LoginBtnState} className='submit-btn'>Login</button></Link>

    </>
  );
}