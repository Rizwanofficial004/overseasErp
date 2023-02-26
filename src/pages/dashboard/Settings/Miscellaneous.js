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
import ShippingCompany from 'src/pages/dashboard/components/settings/MiscellaneousComponents/ShippingCompany';
import PaymentTerms from 'src/pages/dashboard/components/settings/MiscellaneousComponents/PaymentTerms';




// ---------------------------------------------------- ------------------

export default function Miscellaneous() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Payment Terms');

  const ACCOUNT_TABS = [
    {
      value: 'Payment Terms',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='hsl(248, 53%, 58%)' width={23} height={40} />,
      component: <PaymentTerms />,
    },
    {
      value: 'Shipping Company',
      icon: <Iconify icon={'mdi:view-dashboard-edit-outline'} color='#F2740B' width={23} height={40} />,
      component: <ShippingCompany /> 
    },
    {
      value: 'POS',
      icon: <Iconify icon={'iconoir:notes'} color='#F2740B' width={23} height={40} />,
      //component: <SampleOrder /> 
    },
    

  ];

  return (
    <Page title="Settings: Transaction">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Transaction"
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
