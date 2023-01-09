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
// import {CashInvoice, SalesReturn,Allocation,CreditInvoice, Quotations, ReceivePayment, SampleOrder} from '../components/customers/transactions';
// import {SalesOrder} from '../components/customers/transactions';
// import {DeliveryNote} from '../components/customers/transactions';



// ----------------------------------------------------------------------

export default function SettingMaintenance() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Company Details');

  const ACCOUNT_TABS = [
    {
      value: 'Void a Transaction',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='hsl(248, 53%, 58%)' width={23} height={40} />,
     // component: <Quotations />,
    },
    {
      value: 'View/Print Transactions',
      icon: <Iconify icon={'mdi:view-dashboard-edit-outline'} color='#F2740B' width={23} height={40} />,
     // component: <SalesOrder /> 
    },
    {
      value: 'Attch/Upload Documents',
      icon: <Iconify icon={'iconoir:notes'} color='#F2740B' width={23} height={40} />,
      //component: <SampleOrder /> 
    },
    
  ];

  return (
    <Page title="Settings: Maintenance">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Maintenance"
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
