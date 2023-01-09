import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { capitalCase } from 'change-case';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
import { useCallback, useEffect, useMemo,useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {  Grid, Stack, Switch, Typography, FormControlLabel } from '@mui/material';
// utils
// import { fData } from 'src/utils/formatNumber';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
import Iconify from 'src/components/Iconify';
// _mock
import { countries } from 'src/_mock';
// components
import Label from 'src/components/Label';
import { styled } from '@mui/material/styles';
import { FormProvider, RHFSelect, RHFSwitch, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
// import {Contacts} from './AddcustomerComponents';
// import {Contacts} from '../components/customers/transactions';
// ----------------------------------------------------------------------

// AddCustomer.propTypes = {
//   isEdit: PropTypes.bool,
//   currentUser: PropTypes.object,
// };

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));
export default function CompanyDetails({ isEdit, currentUser }) {
  const navigate = useNavigate();

   console.log("ali");
  const { enqueueSnackbar } = useSnackbar();
  const [currentTab, setCurrentTab] = useState('Contacts');
  const [findFriends, setFindFriends] = useState('');
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    country: Yup.string().required('country is required'),
    company: Yup.string().required('Company is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    role: Yup.string().required('Role Number is required'),
    avatarUrl: Yup.mixed().test('required', 'Avatar is required', (value) => value !== ''),
  });
  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };
  const handleFindFriends = (value) => {
    setFindFriends(value);
  };
  const defaultValues = useMemo(
    () => ({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || '',
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser]
  );
 const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentUser) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentUser]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? 'Create success!' : 'Update success!');
      navigate(PATH_DASHBOARD.user.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'avatarUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        
          
        <Grid item xs={12} md={12}>
     
          <Card sx={{ p: 3,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
          {/* <Card
          sx={{
            
            mt: 0,
            height: 50,
            position: 'relative',
          }}
        >
          

         <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) =>handleChangeTab(value)}
            >
              {/* {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))} */}
            {/* </Tabs>
              </TabsWrapperStyle>
        </Card> */} 

          <h4 style={{marginBottom:15,marginTop:10, textAlign:'center', color:'black'}}> Company Details</h4>


            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              
              <RHFTextField name="name" label="Company Name" size='small'  sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}} />
              <RHFTextField name="name" label="Address" size='small'  sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="email" label="CNIC No" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="ntn" label="Phone Number" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="ntn" label="Fax Number" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="phone"  label="Email Address" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="secondaryphonenumber"  label="BCC Address For All Outgoing Mails" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="phone"  label="Official Company Number" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="phone"  label="GST NO" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFSelect name="salesperson" label="Home Currency" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="salesperson" label="Fiscal Year" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="phone"  label="Tax Periods" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
            </Box>
         

          </Card>
        </Grid>
      </Grid>
      <Grid  px={1} py={1}  container spacing={1}   >
                <Grid item mt={ 2}xs={6} md={6} >
                    <Card height={3} sx={{  p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                           
                            <RHFSelect name="customers" label="Base For Auto Price Calculations"  size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                                <option value="" />
                                {countries.map((option) => (
                                    <option key={option.code} value={option.label}>
                                        {option.label}
                                    </option>
                                ))}
                            </RHFSelect>
                            <RHFTextField name="reference" type="file"  size='small' sx={{ background:'white', borderRadius:1,}}/> 
                            <RHFTextField name="reference" label="OTHER Details" multiline rows={6.5} size='small' sx={{ background:'white', borderRadius:1,}}/>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={6} md={6}>
                    <Card sx={{ p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                           <h4 style={{ textAlign:'center', color:'black'}}>SALES</h4>
                            <RHFTextField name="customerdiscount" label="Discount Percent %" size='small' sx={{ background: 'white',borderRadius:1 }}  />
                            <RHFTextField name="exchangeRate" label="Prompt Payment Discount Percent % " size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="currentCredit" label="Current Credit" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="currentCredit" label="Payment Terms" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="currentCredit" label="Credit Status" size='small' sx={{ background: 'white',borderRadius:1}}/>
                            <RHFTextField name="currentCredit" label="General Notes" multiline rows={4} size='small' sx={{ background: 'white',borderRadius:1}}/>
                        </Box>
                    </Card>
                </Grid>             
              </Grid>  
            <Stack alignItems="flex-center" sx={{ mt: 3}}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting} >
                {!isEdit ? 'Create New Customer' : 'Save Changes'}
              </LoadingButton>
            </Stack>
    </FormProvider> 
  );
}
