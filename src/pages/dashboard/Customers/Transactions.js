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

// ----------------------------------------------------------------------

export default function Transactions() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('general');

  const ACCOUNT_TABS = [
    {
      value: 'Quotations',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <AccountGeneral />,
    },
    {
      value: 'Sales Orders (S.O)',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <AccountBilling cards={_userPayment} addressBook={_userAddressBook} invoices={_userInvoices} />,
    },
    {
      value: 'Delivery Note (D.N)',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <AccountNotifications />,
    },
    {
      value: 'Credit Invoice',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <AccountSocialLinks myProfile={_userAbout} />,
    },
    {
      value: 'Cash Invoice',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
    {
      value: 'Receive Payments',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
    {
      value: 'Sale Return',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
    {
      value: 'Allocation',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },

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

        <Box sx={{ mb: 5 }} />

       
      </Container>
    </Page>
  );
}
