import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <div>My Website</div>
      <Link to="/menu">
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Go to Menu
        </Button>
      </Link>
      <Link to="/contact">
        <Button variant="contained" color="secondary" style={{ marginTop: '20px', marginLeft: '10px' }}>
          Contact Us
        </Button>
      </Link>
    </div>
  );
};

export default Home;
