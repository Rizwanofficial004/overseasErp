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
// import JournalEntry from '../components/generalTransaction/Transaction/JournalEntry';
// import {  ReceiptVoucher, BankAccountTransfer } from '../components/generalTransaction';
import {PaymentVocher,ReceiptVoucher,BankAccountTransfer,JournalEntry} from '../components/generalTransaction/Transaction';

// ----------------------------------------------------------------------

export default function GeneralTransaction() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Payment Voucher');

  const ACCOUNT_TABS = [
    {
      value: 'Payment Voucher',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='#F2740B' width={23} height={40} />,
      component: <PaymentVocher />,
    },
    {
      value: 'Receipt Voucher',
      icon: <Iconify icon={'mdi:view-dashboard-edit-outline'} color='#F2740B' width={23} height={40} />,
      component: <ReceiptVoucher /> 
    },
    {
      value: 'Bank Account Transfers',
      icon: <Iconify icon={'iconoir:notes'} color='#F2740B' width={23} height={40} />,
      component: <BankAccountTransfer/> 
    },
    {
      value: 'journal Entry (JV)',
      icon: <Iconify icon={'ic:baseline-manage-search'} color='#F2740B' width={25} height={40} />,
      component: <JournalEntry />,
    },
    {
      value: 'Budget Entry',
      icon: <Iconify icon={'bxs:credit-card'} color='#F2740B' width={23} height={40} />,
    //   component: <CreditInvoice />,
    },
    {
      value: 'Reconcile Bank Account',
      icon: <Iconify icon={'bi:cash'} color='#F2740B' width={23} height={40} />,
    //   component: <CashInvoice />,
    },

  ];

  return (
    <Page title="GeneralLedger: Transactions">
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
