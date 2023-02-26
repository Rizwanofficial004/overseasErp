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
import { NewItems,BarCode,Category, InventoryLocation, Description } from '../components/Inventory/Setup';
import LocationinventoryForm from 'src/sections/@dashboard/calendar/inventory/LocationinventoryForm';
import UnitsOfMeasure from '../components/Inventory/Setup/UnitsOfMeasure';

// ----------------------------------------------------------------------

export default function InventorySetup() {
  const { themeStretch } = useSettings();

  const [currentTab, setCurrentTab] = useState('items');

  const ACCOUNT_TABS = [
    {
      value: 'items',
      icon: <Iconify icon={'fa6-solid:notes-medical'} color='#F2740B' width={23} height={40} />,
      component: <NewItems/>,
    },
    {
      value: 'BarCodes',
      icon: <Iconify icon={'mdi:barcode-scan'} color='#F2740B' width={23} height={40} />,
      component: <BarCode /> 
    },
    {
        value: 'Categories',
        icon: <Iconify icon={'carbon:category-new-each'} color='#F2740B' width={23} height={40} />,
        component: <Category /> 
      },
      {
        value: 'Locations',
        icon: <Iconify icon={'material-symbols:add-location-alt-outline-rounded'} color='#F2740B' width={23} height={40} />,
        component: <InventoryLocation /> 
      },
      {
        value: 'Movement Type',
        icon: <Iconify icon={'carbon:movement'} color='#F2740B' width={23} height={40} />,
        component: <Description /> 
      },
      {
        value: 'Unit of Measure',
        icon: <Iconify icon={'arcticons:tapemeasure'} color='#F2740B' width={30} height={40} />,
        component: <UnitsOfMeasure /> 
      },
      {
        value: 'Import CSV Items',
        icon: <Iconify icon={'tabler:database-import'} color='#F2740B' width={23} height={40} />,
        //component: <OpeningBalance /> 
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
