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
import { CompanyDetails,ItemTax } from '../components/settings/CompanySetupComponents';
// import {CashInvoice, SalesReturn,Allocation,CreditInvoice, Quotations, ReceivePayment, SampleOrder} from '../components/customers/transactions';
// import {SalesOrder} from '../components/customers/transactions';
// import {DeliveryNote} from '../components/customers/transactions';



// ----------------------------------------------------------------------

export default function CompanySetup() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Company Details');

  const ACCOUNT_TABS = [
    {
      value: 'Company Details',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='hsl(248, 53%, 58%)' width={23} height={40} />,
      component: <CompanyDetails />,
    },
    {
      value: 'User Setup',
      icon: <Iconify icon={'mdi:view-dashboard-edit-outline'} color='#F2740B' width={23} height={40} />,
     // component: <SalesOrder /> 
    },
    {
      value: 'User Rights',
      icon: <Iconify icon={'iconoir:notes'} color='#F2740B' width={23} height={40} />,
      //component: <SampleOrder /> 
    },
    {
      value: 'Configuration',
      icon: <Iconify icon={'ic:baseline-manage-search'} color='#F2740B' width={25} height={40} />,
      //component: <DeliveryNote />,
    },
    {
      value: 'Forms Number',
      icon: <Iconify icon={'bxs:credit-card'} color='#F2740B' width={23} height={40} />,
      //component: <CreditInvoice />,
    },
    {
      value: 'GST Rate',
      icon: <Iconify icon={'bi:cash'} color='#F2740B' width={23} height={40} />,
      //component: <CashInvoice />,
    },
    {
      value: 'Customer Tax Setup',
      icon: <Iconify icon={'material-symbols:payments-sharp'} color='#F2740B' width={23} height={40} />,
      //component: <ReceivePayment />,
    },
    {
      value: 'Item Tax Setup',
      icon: <Iconify icon={'fluent:group-return-24-regular'} color='#F2740B' width={25} height={40} />,
      component: <ItemTax/>,
    },
    {
      value: 'System Setup',
      icon: <Iconify icon={'ooui:articles-rtl'} color='#F2740B' width={23} height={20} />,
      //component: <Allocation />,
    },
    {
        value: 'Fiscal Years',
        icon: <Iconify icon={'ooui:articles-rtl'} color='#F2740B' width={23} height={20} />,
        //component: <Allocation />,
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
