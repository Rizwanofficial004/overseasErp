// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  inventory: getIcon('material-symbols:inventory-2'),
  
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Dashboard',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      // { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      // { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      // { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      // { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // MANAGEMENT : USER
      {
        title: 'User',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Profile', path: PATH_DASHBOARD.user.profile },
          { title: 'Cards', path: PATH_DASHBOARD.user.cards },
          { title: 'List', path: PATH_DASHBOARD.user.list },
          { title: 'Create', path: PATH_DASHBOARD.user.newUser },
          { title: 'Edit', path: PATH_DASHBOARD.user.editById },
          { title: 'Account', path: PATH_DASHBOARD.user.account },
        ],
      },
      {
        title: 'Customers',
        path: PATH_DASHBOARD.customers.root,
        icon: <Icon icon="material-symbols:account-box" color="#d35400" />,
        children: [
          { title: 'Transactions', path: PATH_DASHBOARD.customers.transactions },
          { title: 'Reports', path: PATH_DASHBOARD.customers.reports },
          { title: 'Setup', path: PATH_DASHBOARD.customers.setup },
        ],
      },
      {
        title: 'Suppliers',
        path: PATH_DASHBOARD.suppliers.root,
        icon: <Icon icon="material-symbols:supervisor-account" color="#d35400" />,
        children: [
          { title: 'Transactions', path: PATH_DASHBOARD.suppliers.transaction },
          { title: 'Reports', path: PATH_DASHBOARD.suppliers.report },
          { title: 'Setup', path: PATH_DASHBOARD.suppliers.setup },
        ],
      },
      {
        title: 'Inventory',
        path: PATH_DASHBOARD.inventory.root,
        icon: <Icon icon="material-symbols:inventory-2" color="#d35400" />,
        children: [
          { title: 'Transaction', path: PATH_DASHBOARD.inventory.inventorytransaction },
          { title: 'Report', path: PATH_DASHBOARD.inventory.inventoryreport },
          { title: 'Setup', path: PATH_DASHBOARD.inventory.inventorysetup },
        ],
      },
      {
        title: 'General Ledger ',
        path: PATH_DASHBOARD.generalledger.root,
        icon: <Icon icon="material-symbols:attractions" color="#d35400" />,
        children: [
          { title: 'Transactions', path: PATH_DASHBOARD.generalledger.generaltransactions },
          { title: 'Reports', path: PATH_DASHBOARD.generalledger.generalreport },
          { title: 'Setup', path: PATH_DASHBOARD.generalledger.generalsetup },
        ],
      },
      {
        title: 'Settings ',
        path: PATH_DASHBOARD.settings.root,
        icon: <Icon icon="material-symbols:construction-rounded" color="#d35400" />,
        children: [
          { title: 'Company Setup', path: PATH_DASHBOARD.settings.companysetup },
          { title: 'Miscellaneous', path: PATH_DASHBOARD.settings.miscellaneous },
          { title: 'Maintenance', path: PATH_DASHBOARD.settings.settingmaintenance },
        ],
      },
      // MANAGEMENT : E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //     { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice },
      //   ],
      // },

      // MANAGEMENT : BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.postById },
      //     { title: 'new post', path: PATH_DASHBOARD.blog.newPost },
      //   ],
      // },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [
      {
        title: 'mail',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
      { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      {
        title: 'kanban',
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban,
      },
    ],
  },
];

export default navConfig;
