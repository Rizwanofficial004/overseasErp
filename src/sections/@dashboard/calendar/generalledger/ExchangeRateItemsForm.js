import PropTypes from 'prop-types';
import * as Yup from 'yup';
import React, { useState } from 'react';
import merge from 'lodash/merge';

import { useSnackbar } from 'notistack';
// form
import { useForm} from 'react-hook-form';

import { Box,Card,Grid,Stack,TextField, Button, DialogActions } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch } from 'src/redux/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LoadingButton } from '@mui/lab';

// components

import { FormProvider, RHFTextField,  } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (event) => {
    const _event = {
        dateofusefrom:'',
        exchangerate:'',
        textColor: '#1890FF',
  };
  if (event) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

ExchangeRateItemsForm.propTypes = {
  event: PropTypes.object,
  // range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function ExchangeRateItemsForm({ event, onCancel, exchangerate, setexchangerate}) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [dateofusefrom, setdateofusefrom] = useState(new Date());
  const EventSchema = Yup.object().shape({
    
    
  });

  const methods = useForm({
    // resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(">>>>>>>>>>:::", data);
    setexchangerate([...exchangerate, data])
    onCancel();
      reset();
    // try {
    //   const newEvent = {
    //     title: data.title,
    //     description: data.description,
    //     textColor: data.textColor,
    //     allDay: data.allDay,
    //     start: data.start,
    //     end: data.end,
    //   };
    //   if (event.id) {
    //     dispatch(updateEvent(event.id, newEvent));
    //     enqueueSnackbar('Update success!');
    //   } else {
    //     enqueueSnackbar('Create success!');
    //     dispatch(createEvent(newEvent));
    //   }
    //   onCancel();
    //   reset();
    // } catch (error) {
    //   console.error(error);
    // }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid item xs={12} md={12}>
            <Card sx={{ p: 5, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
                <Box
                sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                    }}
                >
                <Card sx={{p:3}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                        <Stack spacing={3} sx={{ mt: 1 }}>
                            <DesktopDatePicker
                                label="Date Of Use From"
                                value={dateofusefrom}
                                // minDate={dayjs('2017-01-01')}
                                onChange={(newValue) => {
                                    setdateofusefrom(newValue);
                                }}
                                renderInput={(params) => <TextField {...params}  sx={{mt:1}}/>}
                            />
                        </Stack>
                    </LocalizationProvider>
                </Card>
                <Card sx={{p:3}}>
                <RHFTextField name="exchangerate" label="Exchange Rate" sx={{mt:2}}/>
                
                </Card> 
               
            
                </Box>
               
            </Card>
            </Grid>
            <DialogActions>
                <Box sx={{ flexGrow: 1 }} />

                <Button variant="outlined" color="inherit" onClick={onCancel}>
                    Cancel
                </Button>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
                    Add
                </LoadingButton>
            </DialogActions>
  </FormProvider>
  );
}
