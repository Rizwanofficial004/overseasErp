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
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
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
import GeneralSettings from './NewitemsComponents/GeneralSettings';
import SalesPricing from './NewitemsComponents/SalesPricing';
import PurchasingPrice from './NewitemsComponents/PurchasingPrice';
import StandardCosts from './NewitemsComponents/StandardCosts';
// import Contact from './NewCustomerComponents/Contact';
// import CustomerTransation from './NewCustomerComponents/CustomerTransaction';


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

export default function NewItems() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  const [currentTab, setCurrentTab] = useState('General Settings');
  // const [findFriends, setFindFriends] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  // const handleFindFriends = (value) => {
  //   setFindFriends(value);
  // };
  const { enqueueSnackbar } = useSnackbar();
  // const [date, setDate] = useState(new Date());
  
 
  
      
      const CURRENT_TABS = [
        {
          value: 'General Settings',
          icon: <Iconify icon={'eva:heart-fill'} width={20} height={20} />,
          component: <GeneralSettings/>,
        },
        {
          value: 'Sales Pricing ',
          icon: <Iconify icon={'eva:people-fill'} width={20} height={20} />,
          component: <SalesPricing />,
        },
        {
          value: 'Purchasing Pricing  ',
          icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
          component: <PurchasingPrice />,
        },
        {
            value: 'Standerd Costs ',
            icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
            component: <StandardCosts />,
          },
          {
            value: 'Reorder Levels  ',
            icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
          
          },
          {
            value: 'Transactions ',
            icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
          
          },
          {
            value: 'Status ',
            icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
          
          },
      ];
  return (
  <Container>
    <Page title="Setup: New Customer">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            backgroundColor:'#ff6347',
            mb: 3,
            height: 200,
            position: 'relative',
          }}
        >
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
  </Container>   
  );
}
