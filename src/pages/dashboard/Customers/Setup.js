import { capitalCase } from 'change-case';
import React, { useState } from 'react';
// @mui
import { Container, Tab, Box, Tabs } from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from 'src/_mock';
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import HeaderBreadcrumbs from 'src/components/HeaderBreadcrumbs';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from 'src/sections/@dashboard/user/account';
import {AddBranch,SalesType,SalesPersons,NewCustomer} from '../components/customers/setup';


// ----------------------------------------------------------------------

export default function Setup() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('New Customer');

  const ACCOUNT_TABS = [
    {
      value:  'New Customer',
      icon: <Iconify icon={'la:industry'} color='#F2740B' width={25} height={40} />,
      component: <NewCustomer />
    },
    {
      value: 'New Branch',
      icon: <Iconify icon={'mdi:source-branch-plus'} color='#F2740B' width={25} height={40} />,
      component: <AddBranch /> 
    },
    {
      value: 'Sales Person',
      icon: <Iconify icon={'akar-icons:person-add'} color='#F2740B' width={25} height={40} />,
      component: <SalesPersons /> 
    },
    {
      value: 'Sales Type',
      icon: <Iconify icon={'lucide:file-type'} color='#F2740B' width={25} height={40} />,
      component: <SalesType />,
    },
    
  ];
  return (
    <Page title="Customers: Setup">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Setup"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },  
            { name: 'Account Settings' },
          ]}
        />
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={tab.value} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>
        <Box sx={{ mb: 3 }} />
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}