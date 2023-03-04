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
import ExchangeRate from 'src/pages/dashboard/components/generalTransaction/Setup/ExchangeRate';
import COAGroup from 'src/pages/dashboard/components/generalTransaction/Setup/COAGroup';
import Currency from 'src/pages/dashboard/components/generalTransaction/Setup/Currency';
import AddBankAccount from '../components/generalTransaction/Setup/AddBankAccount';
import ChartofAccount from '../components/generalTransaction/Setup/ChartofAccount';




// ----------------------------------------------------------------------

export default function GeneralSetup() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Add Bank Account');

  const ACCOUNT_TABS = [
    {
      value: 'Add Bank Account',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='#F2740B' width={23} height={40} />,
      component: <AddBankAccount />,
    },
    {
      value: 'Voucher Templates',
      icon: <Iconify icon={'mdi:view-dashboard-edit-outline'} color='#F2740B' width={23} height={40} />,
      //component: <SalesOrder /> 
    },
    {
      value: 'Currencies',
      icon: <Iconify icon={'iconoir:notes'} color='#F2740B' width={23} height={40} />,
      component: <Currency /> 
    },
    {
      value: 'Exchange Rates',
      icon: <Iconify icon={'ic:baseline-manage-search'} color='#F2740B' width={25} height={40} />,
      component: <ExchangeRate />,
    },
    {
      value: 'Chart Of Accounts (COA)',
      icon: <Iconify icon={'bxs:credit-card'} color='#F2740B' width={23} height={40} />,
      component: <ChartofAccount />,
    },
    {
      value: 'COA Grouping',
      icon: <Iconify icon={'bi:cash'} color='#F2740B' width={23} height={40} />,
      component: <COAGroup />,
    },
    {
      value: 'GL Account CLasses',
      icon: <Iconify icon={'material-symbols:payments-sharp'} color='#F2740B' width={23} height={40} />,
    //   component: <ReceivePayment />,
    },
    {
      value: 'Import Multiple Journal Entries',
      icon: <Iconify icon={'fluent:group-return-24-regular'} color='#F2740B' width={25} height={40} />,
    //   component: <SalesReturn/>,
    },
  ];

  return (
    <Page title="GeneralSetup: Setup">
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
