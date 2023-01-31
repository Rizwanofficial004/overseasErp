import { capitalCase } from 'change-case';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useCallback, useEffect, useMemo,useState } from 'react';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {  Grid, Stack} from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useAuth from 'src/hooks/useAuth';
import useSettings from 'src/hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userFriends, _userGallery, _userFollowers } from 'src/_mock';
import { FormProvider, RHFSelect, RHFTextField } from 'src/components/hook-form';

// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
//sections
import { ProfileCover
} from 'src/sections/@dashboard/user/profile';
import { countries } from 'src/_mock';
import Contact from './NewCustomerComponents/Contact';
import CustomerTransation from './NewCustomerComponents/CustomerTransaction';


// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

export default function NewCustomer() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState('Add Customer');
  // const [findFriends, setFindFriends] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  // const handleFindFriends = (value) => {
  //   setFindFriends(value);
  // };
  const { enqueueSnackbar } = useSnackbar();
  // const [date, setDate] = useState(new Date());
  
  const UpdateUserSchema = Yup.object().shape({
      displayName: Yup.string().required('Name is required'),
  });
  // const AddButton = () => {
  //     return (
  //         <Button
  //             // component={RouterLink}
  //             // to={PATH_DASHBOARD.user.newUser}
  //         >
  //             Add
  //         </Button>
  //         )
  //     }
      const defaultValues = {
        
        defaultinventorylocation: '',
        defaultshippingcompany: '',
        salesarea: '',
        taxgroup: '',
        otherdetails: '',
        discountpercent: '',
        promotepaymentdiscount: '',
        Creditlimit: '',
        paymentterms: '',
        creditstatus: '',
        generalnotes: '',
        customername: '',
        customershortname: '',
        address: '',
        ntnnumber: '',
        gstnumber: '',
        customercurrency: '',
        salestype: '',
        phone: '',
        secondaryphonenumber: '',
        faxnumber: '',
        email: '',
        salesperson: '',

      };
      const methods = useForm({
          resolver: yupResolver(UpdateUserSchema),
          defaultValues,
      });
      const {
          setValue,
          handleSubmit,
          formState: { isSubmitting },
      } = methods;

      const onSubmit = async () => {
          try {
              await new Promise((resolve) => setTimeout(resolve, 500));
              enqueueSnackbar('Update success!');
          } catch (error) {
              console.error(error);
          }
      };
      const handleDrop = useCallback(
          (acceptedFiles) => {
              const file = acceptedFiles[0];

              if (file) {
                  setValue(
                      'photoURL',
                      Object.assign(file, {
                          preview: URL.createObjectURL(file),
                      })
                  );
              }
          },
          [setValue]
      );
      const CURRENT_TABS = [
        {
          value: 'Contacts',
          icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
          component: <Contact/>,
        },
        {
          value: 'Transactions',
          icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
          component: <CustomerTransation />,
        },
        {
          value: 'Sale Orders',
          icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
          //component: <ProfileGallery gallery={_userGallery} />,
        },
      ];
  return (
  <Container>
    <Page title="Setup: New Customer">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
        <ProfileCover myProfile={_userAbout} />
          <TabsWrapperStyle>
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {CURRENT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.value} icon={tab.icon} value={tab.value} />
          ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>
        <Box sx={{ mb: 3 }} />
        { CURRENT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
          <h4 style={{marginBottom:15,marginTop:10, textAlign:'center', color:'black'}}> CUSTOMER DETAILS </h4>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="customername" label="Customer Name" size='small'  sx={{ background: 'white',color:'#FF0000',borderColor:'#FF0000', borderRadius:1}} />
              <RHFTextField name="customershortname" label="Customer Short Name" size='small'  sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="address" label="Address" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="ntnnumber" label="NTN Number" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="gstnumber" label="GST Number" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFSelect name="customercurrency" label="Customer Currency" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFSelect name="salestype" label="Sales Type / Price List" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
              <RHFTextField name="phone"  label="Phone" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="secondaryphonenumber"  label="Secondary Phone Number" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="faxnumber"  label="Fax Number" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFTextField name="email"  label="E-mail" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}/>
              <RHFSelect name="salesperson" label="Sales Person" size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                <option value="" />
                {countries.map((option) => (
                  <option key={option.code} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </RHFSelect>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Grid  px={1} py={1}  container spacing={1}   >
        <Grid item xs={12} md={12} >
            <Card height={3} sx={{  p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }} >
                <Box
                    sx={{
                        display: 'grid',
                        rowGap: 2,
                        columnGap: 1,
                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                    }}
                >
                    <h4 style={{ textAlign:'center', color:'black'}}>BRANCH</h4>
                    <RHFSelect name="defaultinventorylocation" label="Default Inventory Location"  size='small' sx={{ background: 'white',borderColor:'#FF0000', borderRadius:1}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFSelect name="defaultshippingcompany" label="Default Shipping Company" size='small' sx={{ background: 'white',borderRadius:1}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFSelect name="salesarea" label="Sales Area" size='small' sx={{ background: 'white',borderRadius:1}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFSelect name="taxgroup" label="Tax Group" size='small' sx={{ background: 'white',borderRadius:1}}>
                        <option value="" />
                        {countries.map((option) => (
                            <option key={option.code} value={option.label}>
                                {option.label}
                            </option>
                        ))}
                    </RHFSelect>
                    <RHFTextField name="otherdetails" label="OTHER Details" multiline rows={6.5} size='small' sx={{ background:'white', borderRadius:1,}}/>
                </Box>
            </Card>
        </Grid>
        <Grid item xs={12} md={12}>
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
                    <RHFTextField name="discountpercent" label="Discount Percent %" size='small' sx={{ background: 'white',borderRadius:1 }}  />
                    <RHFTextField name="promotepaymentdiscount" label="Prompt Payment Discount Percent % " size='small' sx={{ background: 'white',borderRadius:1}}/>
                    <RHFTextField name="Creditlimit" label="Credit Limit" size='small' sx={{ background: 'white',borderRadius:1}}/>
                    <RHFTextField name="paymentterms" label="Payment Terms" size='small' sx={{ background: 'white',borderRadius:1}}/>
                    <RHFTextField name="creditstatus" label="Credit Status" size='small' sx={{ background: 'white',borderRadius:1}}/>
                    <RHFTextField name="generalnotes" label="General Notes" multiline rows={4} size='small' sx={{ background: 'white',borderRadius:1}}/>
                </Box>
            </Card>
        </Grid>             
      </Grid>  
      <Stack spacing={1} alignItems="flex-end" sx={{ mt: 1,borderRadius: 1 }}>
        <Box display={'flex'} sx={{justifyContent: 'center',m:5}} >
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Submit
          </LoadingButton>
        </Box>
      </Stack> 
    </FormProvider>
  </Container>    
  );
}
