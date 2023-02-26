import { useState } from 'react';
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
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
//sections
import Contact from './NewCustomerComponents/Contact';
import CustomerTransation from './NewCustomerComponents/CustomerTransaction';
import NewCustomeritems from './NewCustomerComponents/NewCustomeritems';


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

  const [currentTab, setCurrentTab] = useState('General Setting');
  // const [findFriends, setFindFriends] = useState('');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };


     
      const CURRENT_TABS = [
        {
          value: 'General Setting',
          icon: <Iconify icon={'mdi:home-edit'} width={20} height={20} />,
          component: <NewCustomeritems/>,
        },
        {
          value: 'Contacts',
          icon: <Iconify icon={'mdi:card-account-phone'} width={20} height={20} />,
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
