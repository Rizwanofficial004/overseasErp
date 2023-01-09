import { capitalCase } from 'change-case';
import { useState } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Container, Tab, Box, Tabs,Card } from '@mui/material';
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
import {CashInvoice, SalesReturn,Allocation,CreditInvoice, Quotations, ReceivePayment, SampleOrder} from '../components/customers/transactions';
import {SalesOrder} from '../components/customers/transactions';
import {DeliveryNote} from '../components/customers/transactions';
import QuotationPrint from '../components/customers/transactions/QuotationPrint';

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function Transactions() {
  const { themeStretch } = useSettings();
  const [currentTab, setCurrentTab] = useState('Quotations');
  const ACCOUNT_TABS = [
    {
      value: 'Quotations',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='hsl(248, 53%, 58%)' width={23} height={40} />,
      component: <Quotations />,
    },
    {
      value: 'Sales Orders (S.O)',
      icon: <Iconify icon={'mdi:view-dashboard-edit-outline'} color='#F2740B' width={23} height={40} />,
      component: <SalesOrder /> 
    },
    {
      value: 'Sample Orders (S.O)',
      icon: <Iconify icon={'iconoir:notes'} color='#F2740B' width={23} height={40} />,
      component: <SampleOrder /> 
    },
    {
      value: 'Delivery Note (D.N)',
      icon: <Iconify icon={'ic:baseline-manage-search'} color='#F2740B' width={25} height={40} />,
      component: <DeliveryNote />,
    },
    {
      value: 'Credit Invoice',
      icon: <Iconify icon={'bxs:credit-card'} color='#F2740B' width={23} height={40} />,
      component: <CreditInvoice />,
    },
    {
      value: 'Cash Invoice',
      icon: <Iconify icon={'bi:cash'} color='#F2740B' width={23} height={40} />,
      component: <CashInvoice />,
    },
    {
      value: 'Receive Payments',
      icon: <Iconify icon={'material-symbols:payments-sharp'} color='#F2740B' width={23} height={40} />,
      component: <ReceivePayment />,
    },
    {
      value: 'Sale Return',
      icon: <Iconify icon={'fluent:group-return-24-regular'} color='#F2740B' width={25} height={40} />,
      component: <SalesReturn/>,
    },
    {
      value: 'Allocation',
      icon: <Iconify icon={'ooui:articles-rtl'} color='#F2740B' width={23} height={20} />,
      component: <Allocation />,
    },
    {
      value: 'Print',
      icon: <Iconify icon={'ooui:articles-rtl'} color='#F2740B' width={23} height={20} />,
      component: <QuotationPrint />,
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
         <Card
          sx={{
            backgroundColor:'#ff6347',
            mb: 3,
            height: 200,
            position: 'relative',
          }}
        ><Tab name={currentTab}></Tab>
          <TabsWrapperStyle>
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
        </TabsWrapperStyle>
        </Card>
        <Box sx={{ mb: 3 }} />
        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
