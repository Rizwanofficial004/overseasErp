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
import VoucherSearch from '../components/generalTransaction/Report/VoucherSearch';

// ----------------------------------------------------------------------

export default function GeneralReport() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Voucher Search');

  const ACCOUNT_TABS = [
    {
      value: 'Voucher Search',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='#F2740B' width={23} height={40} />,
      component: <VoucherSearch />,
    },
    {
      value: 'General Ledger Dashboard',
      icon: <Iconify icon={'mdi:view-dashboard-edit-outline'} color='#F2740B' width={23} height={40} />,
      //component: <SalesOrder /> 
    },
    {
      value: 'Bank Account Dashboard',
      icon: <Iconify icon={'iconoir:notes'} color='#F2740B' width={23} height={40} />,
    //   component: <SampleOrder /> 
    },
    {
      value: 'GST Report',
      icon: <Iconify icon={'ic:baseline-manage-search'} color='#F2740B' width={25} height={40} />,
    //   component: <DeliveryNote />,
    },
    {
      value: 'Tax Inquiry (Cash Basis)',
      icon: <Iconify icon={'bxs:credit-card'} color='#F2740B' width={23} height={40} />,
    //   component: <CreditInvoice />,
    },
    {
      value: 'Trial Balance Report',
      icon: <Iconify icon={'bi:cash'} color='#F2740B' width={23} height={40} />,
    //   component: <CashInvoice />,
    },
    {
      value: 'Balance Sheet Report',
      icon: <Iconify icon={'material-symbols:payments-sharp'} color='#F2740B' width={23} height={40} />,
    //   component: <ReceivePayment />,
    },
    {
      value: 'Profit and Loss Statement',
      icon: <Iconify icon={'fluent:group-return-24-regular'} color='#F2740B' width={25} height={40} />,
    //   component: <SalesReturn/>,
    },
    {
      value: 'Print Reports',
      icon: <Iconify icon={'ooui:articles-rtl'} color='#F2740B' width={23} height={20} />,
    //   component: <Allocation />,
    },

  ];

  return (
    <Page title="GeneralReport: Report">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Report"
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
