import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSwitch } from '../../../components/hook-form';

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
        salespersonname: '',
        Telephonenumber: '',
        faxnumber: '',
        provison2: 0,
        provision: 0,
        breakpt: 0,
        email: '',
        textColor: '#1890FF',
  };

  if (event) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

SalesPersonForm.propTypes = {
  event: PropTypes.object,
  // range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function SalesPersonForm({ event, onCancel, salespersonItems, setsalespersonItems }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();


  const EventSchema = Yup.object().shape({
    // itemCode: Yup.string().max(255).required('Item Code is required'),
    // itemDescription: Yup.string().max(5000),
    // longDescription: Yup.string().max(5000),
    // quantity: Yup.string().max(255).required('Quantity is required'),
    // unit: Yup.string().max(255).required('Unit is required'),
    // priceBeforeTax: Yup.string().max(255).required('Price Before Tax is required'),
    // discount: Yup.string().max(255).required('Discount is required'),
    
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
    setsalespersonItems([...salespersonItems, data])
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
      <Stack spacing={3} sx={{ p: 3 }}>
        <RHFTextField name="salespersonname" label="Sales Person Name " />
        <RHFTextField name="Telephonenumber" label="telephone Number" />
        <RHFTextField name="faxnumber" label="Fax Number" />
        <RHFTextField name="email" label="E-mail" />
        <RHFTextField name="provision" label="Provision" />
        <RHFTextField name="breakpt" label="Break Pt" />
        <RHFTextField name="provison2" label="Provision 2" />
       
      </Stack>

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
