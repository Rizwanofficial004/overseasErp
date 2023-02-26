import _mock from './_mock';
import { randomNumberRange, randomInArray } from './funcs';

// ----------------------------------------------------------------------

export const _userAbout = {
  id: _mock.id(1),
  cover: _mock.image.cover(1),
  position: 'UI Designer',
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  quote: 'Tart I love sugar plum I love oat cake. Sweet roll caramels I love jujubes. Topping cake wafer..',
  country: _mock.address.country(1),
  email: _mock.email(1),
  company: _mock.company(1),
  school: _mock.company(2),
  role: 'Manager',
  facebookLink: `https://www.facebook.com/caitlyn.kerluke`,
  instagramLink: `https://www.instagram.com/caitlyn.kerluke`,
  linkedinLink: `https://www.linkedin.com/in/caitlyn.kerluke`,
  twitterLink: `https://www.twitter.com/caitlyn.kerluke`,
};

export const _userFollowers = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  country: _mock.address.country(index),
  isFollowed: _mock.boolean(index),
}));

export const _userFriends = [...Array(18)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  role: _mock.role(index),
}));

export const _userGallery = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  title: _mock.text.title(index),
  postAt: _mock.time(index),
  imageUrl: _mock.image.cover(index),
}));

export const _userFeeds = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  author: {
    id: _mock.id(8),
    avatarUrl: _mock.image.avatar(1),
    name: 'Caitlyn Kerluke',
  },
  isLiked: true,
  createdAt: _mock.time(index),
  media: _mock.image.feed(index),
  message: _mock.text.sentence(index),
  personLikes: [...Array(36)].map((_, index) => ({
    name: _mock.name.fullName(index),
    avatarUrl: _mock.image.avatar(index + 2),
  })),
  comments: (index === 2 && []) || [
    {
      id: _mock.id(7),
      author: {
        id: _mock.id(8),
        avatarUrl: _mock.image.avatar(randomInArray([2, 3, 4, 5, 6]) || 2),
        name: _mock.name.fullName(index + 5),
      },
      createdAt: _mock.time(2),
      message: 'Praesent venenatis metus at',
    },
    {
      id: _mock.id(9),
      author: {
        id: _mock.id(10),
        avatarUrl: _mock.image.avatar(randomInArray([7, 8, 9, 10, 11]) || 7),
        name: _mock.name.fullName(index + 6),
      },
      createdAt: _mock.time(3),
      message:
        'Etiam rhoncus. Nullam vel sem. Pellentesque libero tortor, tincidunt et, tincidunt eget, semper nec, quam. Sed lectus.',
    },
  ],
}));

export const _userCards = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  cover: _mock.image.cover(index),
  name: _mock.name.fullName(index),
  follower: randomNumberRange(999, 99999),
  following: randomNumberRange(999, 99999),
  totalPost: randomNumberRange(999, 99999),
  position: _mock.role(index),
}));

export const _userPayment = [...Array(2)].map((_, index) => ({
  id: _mock.id(index),
  cardNumber: ['**** **** **** 1234', '**** **** **** 5678', '**** **** **** 7878'][index],
  cardType: ['master_card', 'visa', 'master_card'][index],
}));

export const _userAddressBook = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  phone: _mock.phoneNumber(index),
  country: _mock.address.country(index),
  state: 'New Hampshire',
  city: 'East Sambury',
  street: '41256 Kamille Turnpike',
  zipCode: '85807',
}));

export const _userInvoices = [...Array(10)].map((_, index) => ({
  id: _mock.id(index),
  createdAt: _mock.time(index),
  price: _mock.number.price(index),
}));

export const _userList = [...Array(24)].map((_, index) => ({
  id: _mock.id(index),
  avatarUrl: _mock.image.avatar(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  phoneNumber: _mock.phoneNumber(index),
  address: '908 Jack Locks',
  country: _mock.address.country(index),
  state: 'Virginia',
  city: 'Rancho Cordova',
  zipCode: '85807',
  company: _mock.company(index),
  isVerified: _mock.boolean(index),
  status: randomInArray(['active', 'banned']),
  role: _mock.role(index),
}));

export const _quotationItems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  itemCode: '',
  itemDescription: '',
  longDescription: '',
  quantity: '',
  unit: '',
  priceBeforeText: '',
  discount: '',
  total: '',
}));
export const _purchaseorder = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  itemCode:'',
  received:'',
  itemDescription:'',
  quantity:'',
  unit:'',
  requireddeliverydate:'',
  pricebeforetax:'',
  linetotal:'',
  
}));
export const _saletype = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  saletypename: '',
  calculatorfactor: '',
  taxincluded: '',
}));
export const _saleOrderItems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  itemCode: '',
  itemDescription: '',
  longDescription: '',
  quantity: '',
  unit: '',
  priceBeforeText: '',
  discount: '',
  total: '',
}));
export const _unitsofmeasure = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  unitabbreviation:'',
  descriptivename:'',
  decimalplaces:'',
}));
export const _BranchItems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
      branchname: '',
      bshortname: '',
      salesperson: '',
      salesarea: '',
      wht: 0,
      salesgroup: '',
      accountreceivableamount: '',
      salesaccount:'',
      taxgroup: '',
}));
export const _sampleOrderItems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  itemCode: '',
  itemDescription: '',
  longDescription: '',
  quantity: '',
  unit: '',
  priceBeforeText: '',
  discount: '',
  total: '',
}));
export const _salespersonItems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  salespersonname: '',
  Telephonenumber: '',
  faxnumber: '',
  provison2: 0,
  provision: 0,
  breakpt: 0,
  email: '',
}));
export const _salespricing = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  currency: '',
  price: '',
  salestype: '',
 
}));
export const _purchasingprice = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  supplier: '',
  price: '',
  suppliersunitofmeasure: '',
  conversionfactor:'',
  supplerscode:'',
 
}));
export const _barcode = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  upc: '',
  quantity: '',
  description: '',
  category:'',
}));
export const _categoryitems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  categoryname:'',
  itemtaxtype:'',
  itemtype:'',
  unitsofmeasure:'',
  salesaccount:'',
  inventoryaccount:'',
  cogsaccount:'',
  inventoryadjustmentaccount:'',
}));
export const _inventorylocationitems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  locationcode:'',locationname:'',contactofdelivery:'',
  address:'',telephone:'',secondaryphone:'',facsimileno:'',email:'',
}));
export const _shippingItems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  shippingname:'',
  shippingcontactnumber:'',
  shippingsecondarynumber:'',
  shippingcontactperson:'',
  shippingaddress:'',
}));
export const _currencyItems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  currencyabbreviation:'',
  currencysymbol:'',
  currencyname:'',
  hundredthsname:'',
  country:'',
  automaticexchangerateupdate:'',
}));
export const _exchangerate = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  dateofusefrom:'',
  exchangerate:'',
 
}));
export const _itemtax = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  itemtaxdescription:'',
  isfullytax:'',
 
}));
export const _descriptionitems = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  description:'',
}));
export const _paymentterms = [...Array(0)].map((_, index) => ({
  id: _mock.id(index),
  termsdescription:'',
  paymenttype:'',
}));
export const _deliveryitems = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  order: '#8888',
  Reference: '43424',
  purchaseorder: 'PO20392830',
  customer: 'UPFL',
  branch: 'Bhai Phiro Lahore',
  customerorderreference: 100000,
  orderdate: '10-12-2022',
  requiredby: 1000000,
  deliveryto: 1000000,
  ordertotal: 1000000,
  currency: 'Pkr',
  
}));
export const _credititems = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  delivery: '#8888',
  customer: 'UPFL',
  branch: 'Bhai Phiro Lahore',
  contact: '03000000000',
  customerreference: 'PO20392830',
  reference: 100000,
  deliverydate: '10-12-2022',
  dueby: 1000000,
  deliveryto: 1000000,
  Deliverytotal: 1000000,
  currency: 'Pkr',
  
}));
export const _cashInvoiceItems = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  itemCode: '#8888',
  itemDescription: 'senser',
  longDescription: 'senser is available',
  quantity: 10,
  unit: 'pc.',
  priceBeforeText: 100000,
  discount: '10%',
  total: 1000000,
}));
export const _salesReturns = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  itemCode: '#8888',
  itemDescription: 'senser',
  longDescription: 'senser is available',
  quantity: 10,
  unit: 'pc.',
  priceBeforeText: 100000,
  discount: '10%',
  total: 1000000,
}));
export const _allocations = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  itemCode: '#8888',
  itemDescription: 'senser',
  longDescription: 'senser is available',
  quantity: 10,
  unit: 'pc.',
  priceBeforeText: 100000,
  discount: '10%',
  total: 1000000,
}));
export const _quoteItems = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  quote: '#8888',
  Reference: '43424',
  purchaseorder: 'PO20392830',
  customer: 'UPFL',
  branch: 'Bhai Phiro Lahore',
  customerorderreference: 100000,
  quotedate: '10-12-2022',
  validuntil: 1000000,
  deliveryto: 1000000,  
  quotetotal: 9830138103,
  currency: 'Pkr',
  
}));
export const _saleDashItems = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  quote: '#8888',
  Reference: '43424',
  purchaseorder: 'PO20392830',
  customer: 'UPFL',
  branch: 'Bhai Phiro Lahore',
  customerorderreference: 100000,
  quotedate: '10-12-2022',
  validuntil: 1000000,
  deliveryto: 1000000,  
  quotetotal: 9830138103,
  currency: 'Pkr',
  tmpl:1312313,
  
}));