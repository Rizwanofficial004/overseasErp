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
import { InventoryMovements } from '../components/Inventory/Report';
import InventoryStatus from '../components/Inventory/Report/InventoryStatus';
// import { LocationTransfer, OpeningBalance } from '../components/Inventory/transactions';

// ----------------------------------------------------------------------

export default function InventoryReport() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Inventory Movements');

  const ACCOUNT_TABS = [
    {
      value: 'Inventory Movements',
      icon: <Iconify icon={'eva:move-fill'} color='#F2740B' width={23} height={40} />,
      component: <InventoryMovements />,
    },
    {
      value: 'Inventory Status',
      icon: <Iconify icon={'dashicons:admin-settings'} color='#F2740B' width={23} height={40} />,
      component: <InventoryStatus /> 
    },
    {
      value: 'Print Reports',
      icon: <Iconify icon={'dashicons:printer'} color='#F2740B' width={23} height={40} />,
   //   component: <OpeningBalance /> 
      },
    

  ];

  return (
    <Page title="Inventory: Transactions">
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
