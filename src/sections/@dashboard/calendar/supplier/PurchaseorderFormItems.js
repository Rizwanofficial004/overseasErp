import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useDispatch } from 'src/redux/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// @mui
import { Box,Card,Grid, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';

// components
import { FormProvider, RHFTextField, RHFSwitch } from 'src/components/hook-form';

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
    itemCode:'',
    received:'',
    itemDescription:'',
    quantity:'',
    unit:'',
    requireddeliverydate:'',
    pricebeforetax:'',
    linetotal:'',
    textColor: '#1890FF',
  };

  if (event) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

PurchaseorderFormItems.propTypes = {
  event: PropTypes.object,
  // range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function PurchaseorderFormItems({ event, onCancel, purchaseorder, setpurchaseorder }) {
  const { enqueueSnackbar } = useSnackbar();
  const [requireddeliverydate, setrequireddeliverydate] = useState(new Date());

  const dispatch = useDispatch();


  const EventSchema = Yup.object().shape({
    title: Yup.string().max(255).required('Title is required'),
    description: Yup.string().max(5000),
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
    setpurchaseorder([...purchaseorder, data])
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
                        <RHFTextField name="itemCode" label="Item Code "sx={{mt:2}} />
                    </Card>
                    <Card sx={{p:3}}>
                        <RHFTextField name="  received" label=" Received" sx={{mt:2}}/>
                    </Card>
                    <Card sx={{p:3}}>
                        <RHFTextField name="itemDescription" label="Item Description " multiline rows={5}/>
                    </Card>
                    <Card sx={{p:2}}>
                        <RHFTextField name="quantity" label="Quantity" sx={{mt:2}}/>
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <Stack spacing={3} sx={{ mt: 1 }}>
                                <DesktopDatePicker
                                    label="Required Delivery Date"
                                    value={requireddeliverydate}
                                    // minDate={dayjs('2017-01-01')}
                                    onChange={(newValue) => {
                                        setrequireddeliverydate(newValue);
                                    }}
                                    renderInput={(params) => <TextField {...params}  sx={{mt:1}}/>}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </Card>
                    <Card sx={{p:3}}>
                        <RHFTextField name="unit" label="Unit" />
                    </Card>
                    <Card sx={{p:3}}>
                        <RHFTextField name="pricebeforetax" label="Price Before Tax" />
                    </Card>
                </Box>
                    <Card sx={{p:3,mt:2}}>
                        <RHFTextField name="linetotal" label="Line Total" />
                    </Card>
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
