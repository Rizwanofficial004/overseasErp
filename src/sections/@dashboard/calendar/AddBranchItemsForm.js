import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box,Card,Grid, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
// redux
import { countries } from 'src/_mock';
import { useDispatch } from '../../../redux/store';
import { createEvent, updateEvent, deleteEvent } from '../../../redux/slices/calendar';
// components
import Iconify from '../../../components/Iconify';
import { ColorSinglePicker } from '../../../components/color-utils';
import { FormProvider, RHFTextField, RHFSelect,RHFSwitch } from '../../../components/hook-form';

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
      branchname: '',
      Bshortname: '',
      Mailaddress: '',
      billingaddress: '',
      generalnotes: '',
      salesaccount: '',
      salesdiscountaccount: '',
      accountreceivableamount: '',
      wht: '',
      salesperson: '',
      salesarea: '',
      salesgroup: '',
      defaultinventory: '',
      defaultshippingcompany: '',
      taxgroup: '',
      textColor: '#1890FF',
  };

  if (event) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

AddBranchItemsForm.propTypes = {
  event: PropTypes.object,
  // range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function AddBranchItemsForm({ event, onCancel, branchItems, setBranchItems }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();


  const EventSchema = Yup.object().shape({
    // branchname: Yup.string().max(255).required('Item Code is required'),
    // branchshortname: Yup.string().max(5000),
    // contact: Yup.string().max(5000),
    // salesperson: Yup.string().max(255).required('Quantity is required'),
    // area: Yup.string().max(255).required('Unit is required'),
    // phoneno: Yup.string().max(255).required('Price Before Tax is required'),
    // faxno: Yup.string().max(255).required('Discount is required'),
    // email: Yup.string().max(255).required('Discount is required'),
    // taxgroup: Yup.string().max(255).required('Discount is required'),

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
    setBranchItems([...branchItems, data])
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
      <Grid item xs={12} md={12}>
            <Card sx={{ m:5,p: 5, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
                <Box
                    sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                >
                    <Card sx={{p:3}}>
                    <RHFTextField name="branchname" label="Branch Name" size='small'  sx={{ mt:1}} />
                    </Card>
                    <Card sx={{p:3}}>
                    <RHFTextField name="Bshortname" label="Branch Short Name" size='small'  sx={{ mt:1}}/>
                    </Card>
                    <Card sx={{p:3}}>
                    <RHFTextField name="Mailaddress"  label="Mailing Address" multiline rows={4}size='small' sx={{ mt:1}}/>
                    </Card>
                    <Card sx={{p:3}}>
                    <RHFTextField name="billingaddress"  label="Billing Address"multiline rows={4} size='small' sx={{ mt:1}}/>
                    </Card>
                </Box>
                <Card sx={{p:3,mt:3}}>
                    <RHFTextField  name="generalnotes"  label="General Notes" size='small' multiline rows={4}sx={{ mt:1}}/>
                    </Card>
                    <h4 style={{marginBottom:5, marginTop:10, textAlign:'center', color:'#ff6347', fontSize:25}}>GL ACCOUNTS</h4>
                    <Box
                    sx={{
                    display: 'grid',
                    columnGap: 2,
                    rowGap: 3,
                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                >
                    <Card sx={{p:3,mt:3}}>
                    <RHFSelect name="salesaccount" label="Sales Account:"  size='small' sx={{mt:1}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                    </RHFSelect>
                    <RHFSelect name="salesdiscountaccount" label="Sales Discount Account"  size='small' sx={{mt:2}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    </Card>
                    <Card sx={{p:3,mt:3}}>
                    <RHFSelect name="accountreceivableamount" label="Accounts Receivable Account"  size='small' sx={{mt:1}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFSelect name="wht" label="WHT"  size='small' sx={{mt:2}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    </Card>
                </Box>
            </Card> 
        </Grid>
        <Grid  px={1} py={1}  container spacing={1}   >
            <Grid item xs={6} md={6} >
                <Card sx={{  p: 3,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }} >
                    <Box
                        sx={{
                            display: 'grid',
                            rowGap: 2,
                            columnGap: 1,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                        }}
                    >
                        <Card sx={{p:3}}>
                       <h4 style={{marginBottom:5, marginTop:10, textAlign:'center', color:'#ff6347', fontSize:25}}>SALES</h4>
                        <RHFSelect name="salesperson" label="Sales Person"  size='small' sx={{mt:2  }}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                        <RHFSelect name="salesarea" label="Sales Area" size='small' sx={{ mt:2}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                        <RHFSelect name="salesgroup" label="Sales Group" size='small' sx={{ mt:2}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                    </Card>
                    </Box>
                </Card>
            </Grid>
            <Grid item xs={6} md={6}>
                <Card sx={{ p: 3,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                    <Box
                        sx={{
                            display: 'grid',
                            rowGap: 2,
                            columnGap: 1,
                            
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            
                            }}
                    >
                        <Card sx={{p:3}}>
                        <h4 style={{marginBottom:5, marginTop:10, textAlign:'center', color:'#ff6347', fontSize:25}}>GENRAL CONTACT DATA</h4>
                        <RHFSelect name="defaultinventory" label="Default Inventory Location" size='small' sx={{ mt:2}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                        <RHFSelect name="defaultshippingcompany" label="Default Shipping Company" size='small' sx={{ mt:2}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>
                        <RHFSelect name="taxgroup" label="Tax Group" size='small' sx={{ mt:2}}>
                            <option value="" />
                            {countries.map((option) => (
                                <option key={option.code} value={option.label}>
                                    {option.label}
                                </option>
                            ))}
                        </RHFSelect>  
                    </Card>   
                    </Box>
                </Card>
            </Grid>             
        </Grid> 
      </Stack>
      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />
          <Button variant="outlined" color="inherit" onClick={onCancel}>
              Cancel
          </Button>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
            Add Branch
          </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
