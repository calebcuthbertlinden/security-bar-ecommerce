import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

class AddressItem extends Component {
  render() {
    return (
        // <FormControl variant="outlined">
        //             <FormHelperText id="outlined-height-helper-text">Email</FormHelperText>
        //             <OutlinedInput
        //               classes={outlinedInputClasses}
        //               id="outlined-adornment-height"
        //               onChange={this.props.onChange('height')}
        //               aria-describedby="outlined-height-helper-text"
        //               inputProps={{
        //                 'aria-label': 'weight',
        //               }}
        //             />
        //           </FormControl>
                  
        <div className="row form-group justify-content-start">
            <label className="col-sm-4 col-form-label">{this.props.label}</label>
            <div className="col-xl-8">
              <input
                type="text"
                defaultValue={this.props.value}
                onChange={this.props.onChange}
                className="form-control"
                placeholder={this.props.placeholder} />
            </div>
        </div>
      );
  }
}

export default AddressItem;