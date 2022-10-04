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
import {AddCustomer,AddBranch,SalesType,SalesPersons} from '../components/customers/setup';
// import {SalesOrder} from '../components/customers/transactions';
// import {DeliveryNote} from '../components/customers/transactions';



// ----------------------------------------------------------------------

export default function Setup() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('AddCustomer');

  const ACCOUNT_TABS = [
    {
      value: 'New Customer ',
      icon: <Iconify icon={'ic:round-account-box'} color='#F98000' width={20} height={20} />,
      component: <AddCustomer />,
    },
    {
      value: 'New Branch',
      icon: <Iconify icon={'ic:round-receipt'} color='#6495ED' width={20} height={20} />,
      component: <AddBranch /> 
    },
    {
      value: 'Sales Person',
      icon: <Iconify icon={'ic:round-receipt'} color='#6495ED' width={20} height={20} />,
      component: <SalesPersons /> 
    },
    {
      value: 'Sales Type',
      icon: <Iconify icon={'eva:bell-fill'} color='#DE3163' width={20} height={20} />,
      component: <SalesType />,
    },
    // {
    //   value: 'Credit Invoice',
    //   icon: <Iconify icon={'eva:share-fill'} color='#FFBF00' width={20} height={20} />,
    //   component: <CreditInvoice />,
    // },
    // {
    //   value: 'Cash Invoice',
    //   icon: <Iconify icon={'ic:round-vpn-key'} color='#DFFF00' width={20} height={20} />,
    //   component: <CashInvoice />,
    // },
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
    <Page title="Customers: Transactions">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Transactions"
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
