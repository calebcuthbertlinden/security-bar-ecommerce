import './App.css';
import React from 'react';

import { TextField, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm'

import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

const helperTextStyle = makeStyles(theme => ({
  OutlinedInput: {
      '&::placeholder': {
        color: 'white',
      },
    },
  })
);

const useOutlinedInputStyles = makeStyles(theme => ({
  root: {
    "& $notchedOutline": {
      borderColor: "white"
    },
    "&:hover $notchedOutline": {
      borderColor: "#303030"
    },
    "&$focused $notchedOutline": {
      borderColor: "#ff4400"
    },

  },
  focused: {},
  notchedOutline: {}
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ff4400'
    },
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
  button: {
    primary: purple,
    secondary: green,
  },
  overrides: {
    MuiFormControlLabel: {
        focused: {
            color: '#4A90E2'
        }
    },
    MuiOutlinedInput: {
        focused: {
                border: '1px solid #4A90E2'
        },
        notchedOutline: {
            border: '1px solid #4A90E2'
        },
    },
    MuiFormLabel: {
        focused: {
            color: '1px solid #4A90E2'
        }
    },
}});

function App() {

  const helperStyle = helperTextStyle();
  const outlinedInputClasses = useOutlinedInputStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (prop) => (event) => {
    // setValues({ ...values, [prop]: event.target.value });
  };

  function getSteps() {
    return ['Start a new quote', 'Add windows', 'Add delivery address', 'Calculate'];
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <div>
            <h2>Start a new quote</h2>
            <hr/>
            
            SecuriClear invisible security bars cut to correct scale to fit your windows. <br/>
            Specify each window and their dimensions, and we will provide you with the exact amount of bars, as well as instructions on how to install them.

          </div>
      case 1:
        return <div>
            <h2>Add windows</h2>
            <form noValidate autoComplete="off">
            <FormControl variant="outlined">
                <OutlinedInput
                  classes={outlinedInputClasses}
                  id="outlined-adornment-frame"
                  onChange={handleChange('frame')}
                  aria-describedby="outlined-frame-helper-text"
                  inputProps={{
                    'aria-label': 'frame',
                  }}
                  labelWidth={0}
                />
                <FormHelperText style={helperStyle} id="outlined-frame-helper-text">Frame</FormHelperText>
              </FormControl>
              
              <br/>
              
              <FormControl variant="outlined">
                <OutlinedInput
                  classes={outlinedInputClasses}
                  id="outlined-adornment-weight"
                  onChange={handleChange('weight')}
                  endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  labelWidth={0}
                />
                <FormHelperText style={helperStyle} id="outlined-weight-helper-text">Width</FormHelperText>
              </FormControl>

              <br/>

              <FormControl variant="outlined">
                <OutlinedInput 
                  classes={outlinedInputClasses}
                  id="outlined-adornment-height"
                  onChange={handleChange('height')}
                  endAdornment={<InputAdornment position="end">mm</InputAdornment>}
                  aria-describedby="outlined-height-helper-text"
                  inputProps={{
                    'aria-label': 'weight',
                  }}
                  labelWidth={0}
                />
                <FormHelperText id="outlined-height-helper-text">Height</FormHelperText>
              </FormControl>
          
              <br/>
              <br/>

              <Button variant="contained" color="primary">
                Add window
              </Button>

            </form>
          </div>
      case 2:
        return <div>
            <h2>Delivery address</h2>
            <AddressForm />
          </div>
      case 3:
        return <div>
            <h2>View quotation</h2>
          </div>
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className="App">
      
      <ThemeProvider theme={theme}>
      <header className="App-header">
        
          <div >
            {activeStep === steps.length ? (
              <div>
            
                  <Typography>
                    <h2>Payment and delivery instructions</h2>
                    <br/>
                    Please enter your email address below to receive an email containing your quote, the payment and delivery method. <br/>
                    You will also receive instructions on how to install the bars. Thank you for support.
                  </Typography>
                  <br/>
                  <FormControl variant="outlined">
                    <FormHelperText id="outlined-height-helper-text">Email</FormHelperText>
                    <OutlinedInput
                      classes={outlinedInputClasses}
                      id="outlined-adornment-height"
                      onChange={handleChange('height')}
                      aria-describedby="outlined-height-helper-text"
                      inputProps={{
                        'aria-label': 'weight',
                      }}
                    />
                  </FormControl>
                  <br/>
              
                  <Button variant="contained" color="primary">
                    Send payment and delivery details
                  </Button>
                  <br/>
                  <br/>
                  <Button onClick={handleReset} >
                    Back to start
                  </Button>
                
              </div>
            ) : (
              <div >
                <Typography>{getStepContent(activeStep)}</Typography>
              </div>
            )}
          </div>

        </header>
        <footer>
            <br/>
            
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} >
                Back
              </Button>

              <Button
                variant="contained"
                color="primary"
                disabled={activeStep === steps.length}
                onClick={handleNext}>
                {activeStep === steps.length - 1 ? 
                  'Payment details' : 'Next'}
              </Button>
            </div>

            <div style={{padding:32, fontSize:10, color:'#3e3e3e', align:'0 auto'}}>CuanMaizey™</div>
        </footer>
        </ThemeProvider>
      </div>
  );
}

export default App;
