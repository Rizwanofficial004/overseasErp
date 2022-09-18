import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { OutlinedInput } from '@mui/material';

// ----------------------------------------------------------------------

RHFInputField.propTypes = {
  name: PropTypes.string,
};

export default function RHFInputField({ name, ...other }) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <OutlinedInput  {...field} fullWidth error={!!error} helperText={error?.message} {...other} />
      )}
    />
  );
}