import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { useSnackbar } from 'notistack';
// form
import { useForm } from 'react-hook-form';

// @mui
import { Box,Card,Grid, Button, DialogActions } from '@mui/material';

import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch } from '../../../redux/store';
import { FormProvider, RHFTextField } from '../../../components/hook-form';



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
            <RHFTextField name="salespersonname" label="Sales Person Name "sx={{mt:2}} />
            <RHFTextField name="Telephonenumber" label="telephone Number" sx={{mt:2}}/>
          </Card>
          <Card sx={{p:3}}>
            <RHFTextField name="faxnumber" label="Fax Number" sx={{mt:2}} />
            <RHFTextField name="email" label="E-mail" sx={{mt:2}}/>
          </Card>
          <Card sx={{p:3}}>
            <RHFTextField name="provision" label="Provision" />
          </Card>
          <Card sx={{p:3}}>
            <RHFTextField name="breakpt" label="Break Pt" />
          </Card>
          </Box>
          <Card sx={{p:3,mt:2}}>
            <RHFTextField name="provison2" label="Provision 2" />
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
