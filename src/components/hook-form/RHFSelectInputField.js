import PropTypes from 'prop-types';
// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { OutlinedInput } from '@mui/material';

// ----------------------------------------------------------------------

RHFSelectInputField.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string,
};

export default function RHFSelectInputField({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <OutlinedInput
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </OutlinedInput>
      )}
    />
  );
}
