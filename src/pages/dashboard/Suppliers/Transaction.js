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
import {GoodReceivedNote, PurchaseOrder,CreditBill,CashBill, Payment, PurchaseReturn,Allocations} from '../components/suppliers/transaction';

// ----------------------------------------------------------------------
export default function Transaction() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('Purchase Order');

  const ACCOUNT_TABS = [
    {
      value: 'Purchase Order',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='#F2740B' width={23} height={40} />,
      component: <PurchaseOrder />,
    },
    {
      value: 'Good Received Note (GRN)',
      icon: <Iconify icon={'mdi:view-dashboard-edit-outline'} color='#F2740B' width={23} height={40} />,
      component: <GoodReceivedNote /> 
    },
    {
      value: 'Credit Bill',
      icon: <Iconify icon={'iconoir:notes'} color='#F2740B' width={23} height={40} />,
      component: <CreditBill /> 
    },
    {
      value: 'Cash Bill',
      icon: <Iconify icon={'ic:baseline-manage-search'} color='#F2740B' width={25} height={40} />,
      component: <CashBill />,
    },
    {
      value: 'Payments',
      icon: <Iconify icon={'bxs:credit-card'} color='#F2740B' width={23} height={40} />,
      component: <Payment />,
    },
    {
      value: 'Purchase Return',
      icon: <Iconify icon={'bi:cash'} color='#F2740B' width={23} height={40} />,
      component: <PurchaseReturn />,
    },  
    {
      value: 'Allocations',
      icon: <Iconify icon={'material-symbols:payments-sharp'} color='#F2740B' width={23} height={40} />,
      component: <Allocations />,
    },
    {
      value: 'Requisitions Entries',
      icon: <Iconify icon={'fluent:group-return-24-regular'} color='#F2740B' width={25} height={40} />,
    //   component: <SalesReturn/>,
    },
    {
      value: 'Requisitions Allocation',
      icon: <Iconify icon={'ooui:articles-rtl'} color='#F2740B' width={23} height={20} />,
    //   component: <Allocation />,
    }
    
  ];
  return (
    <Page title="Customers: Transaction">
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
