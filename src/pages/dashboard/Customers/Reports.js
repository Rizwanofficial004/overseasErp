import { capitalCase } from 'change-case';
import { useState } from 'react';
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
import { CustomerAllocationDashboard, QuotationDashboard, SalesOrderDashboard, SampleDashboard,PrintReport } from '../components/customers/Reports';
import CustomerTransDashboard from '../components/customers/Reports/CustomerTransDashboard';
// import {SalesOrder} from '../components/customers/reports';
// import {DeliveryNote} from '../components/customers/reports';
// ----------------------------------------------------------------------
export default function Reports() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('QuotationDashboard');
  const ACCOUNT_TABS = [
    {
      value: 'QuotationDashboard',
      icon: <Iconify icon={'mdi:tablet-dashboard'} color='#F2740B' width={25} height={40} />,
      component: <QuotationDashboard />,
    },
    {
      value: 'Sales Order Dashboard',
      icon: <Iconify icon={'akar-icons:dashboard'} color='#F2740B' width={20} height={40} />,
      component: <SalesOrderDashboard /> 
    },
    {
      value: 'Sample Dashboard (S.D)',
      icon: <Iconify icon={'carbon:dashboard-reference'} color='#F2740B' width={20} height={40} />,
      component: <SampleDashboard /> 
    },
    {
      value: 'Customer Transaction Dashboard',
      icon: <Iconify icon={'mdi:monitor-dashboard'} color='#F2740B' width={20} height={40} />,
      component: <CustomerTransDashboard />,
    },
    {
      value: 'Customer Allocation Dashboard',
      icon: <Iconify icon={'mdi:view-dashboard-variant'} color='#F2740B' width={20} height={40} />,
      component: <CustomerAllocationDashboard />,
    },
    {
      value: 'Print Reports',
      icon: <Iconify icon={'flat-color-icons:print'} color='#F2740B' width={20} height={40} />,
      component: <PrintReport/>,
    },
    // {
    //   value: 'Receive Payments',
    //   icon: <Iconify icon={'ooui:articles-search-ltr'} color='#9FE2BF' width={20} height={20} />,
    //   component: <ReceivePayment />,
    // },
    // {
    //   value: 'Sale Return',
    //   icon: <Iconify icon={'mdi:home'} color='#40E0D0' width={20} height={20} />,
    //   component: <SalesReturn/>,
    // },
    // {
    //   value: 'Allocation',
    //   icon: <Iconify icon={'ooui:articles-rtl'} color='#6495ED' width={20} height={20} />,
    //   component: <Allocation />,
    // },

  ];
  return (
    <Page title="Customers: Reports">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Reports"
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
