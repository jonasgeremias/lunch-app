import * as React from 'react';
import TextField from '@mui/material/TextField';

function PriceInput(props) {
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    const input = event.target.value;
    // remove all non-numeric characters
    const numericValue = input.replace(/[^0-9]/g, '');
    // convert the number to a string with two decimal places
    const formattedValue = (numericValue / 100).toFixed(2);
    setValue(formattedValue);
    if (props.onChange) {
      props.onChange(formattedValue);
    }
  };

  return (
    <TextField
      {...props}
      value={value}
      onChange={handleChange}
      inputProps={{
        maxLength: 9,
        pattern: '[0-9.,]*',
      }}
    />
  );
}

export default PriceInput;