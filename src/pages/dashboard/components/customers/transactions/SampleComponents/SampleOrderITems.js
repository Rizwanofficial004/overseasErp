import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Card,
    Table,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    DialogTitle
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from 'src/routes/paths';
// hooks
import useSettings from 'src/hooks/useSettings';
// _mock_
import { _userList, _sampleOrderItems } from 'src/_mock';
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import SearchNotFound from 'src/components/SearchNotFound';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from 'src/sections/@dashboard/user/list';
import { DialogAnimate } from 'src/components/animate';
import { CalendarForm, CalendarStyle, CalendarToolbar, SampleOrderItemsForm } from 'src/sections/@dashboard/calendar';
import { useDispatch, useSelector } from 'react-redux';
import useResponsive from 'src/hooks/useResponsive';
import { getEvents, openModal, closeModal, updateEvent, selectEvent, selectRange } from 'src/redux/slices/calendar';
// ----------------------------------------------------------------------
let data = [
    {   id: '2332',
        priceBeforeTax: 'Shiping Charge', 
        discount: '0.00',
        total: '' , bold: true
    },
    {   id: '3434',
    priceBeforeTax: 'Sub Total', 
    discount: '0.00',
    total: ''  ,bold: true
    },
    {   
    id: '2354',
    priceBeforeTax: 'Amount Total', 
    discount: '0.00',
    total: 'update' , bold: true
    },
  ]
  let QItem = [..._sampleOrderItems, ...data]
  function RedBar() {
    return (
      <Box
        sx={{
          height: 2,
          width:155,
          backgroundColor: 'red',
          marginLeft:55,
          marginBottom:3,
        }}
      />
    );
  }
export default function SampleOrderItems() {
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const [userList, setUserList] = useState(_userList);
    const [sampleOrderItems, setsampleOrderItems] = useState([..._sampleOrderItems]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedsampleOrder, setselectedsampleOrder ] = useState(null)
    const AddButton = () => {
            return (
                <Button
                    variant="contained"
                    // component={RouterLink}
                    // to={PATH_DASHBOARD.user.newUser}
                    startIcon={<Iconify icon={'eva:plus-fill'} />}
                    size='medium'
                    onClick={handleAddEvent}
                >
                    Add
                </Button>
            )
        }
        const TABLE_HEAD = [
            { id: 'name', label: 'Item Code', alignRight: false },
            { id: 'company', label: 'Item Description', alignRight: false },
            { id: 'role', label: 'Long Description', alignRight: false },
            { id: 'isVerified', label: 'Quantity', alignRight: false },
            { id: 'status', label: 'Unit', alignRight: false },
            { id: 'status', label: 'Price Before Tax', alignRight: false },
            { id: 'status', label: 'Discount %', alignRight: false },
            { id: 'status', label: 'Total', alignRight: false },
            { id: '', label: <AddButton />, alignRight: false },
        ];
        
            const selectedEventSelector = (state) => {
                const { events, selectedEventId } = state.calendar;
                if (selectedEventId) {
                    return events.find((_event) => _event.id === selectedEventId);
                }
                return null;
            };
            const dispatch = useDispatch();
            const isDesktop = useResponsive('up', 'sm');
            const [date, setDate] = useState(new Date());
            const [view, setView] = useState(isDesktop ? 'dayGridMonth' : 'listWeek');
            const selectedEvent = useSelector(selectedEventSelector);
            const { events, isOpenModal, selectedRange } = useSelector((state) => state.calendar);
        

        const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (checked) => {
        if (checked) {
            const newSelecteds = userList.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };

    const handleAddEvent = () => {
        dispatch(openModal());
      };
    
    const handleCloseModal = () => {
        dispatch(closeModal());
      };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterByName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteUser = (userId) => {
        const deleteUser = userList.filter((user) => user.id !== userId);
        setSelected([]);
        setUserList(deleteUser);
    };

    const handleDeleteMultiUser = (selected) => {
        const deleteUsers = userList.filter((user) => !selected.includes(user.name));
        setSelected([]);
        setUserList(deleteUsers);
    };
    const handleEditEvent = (obj) => {
        setselectedsampleOrder(obj)
        dispatch(openModal());
    };  

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && Boolean(filterName);
   

    return (
        <Page title="User: List" padding='1.5rem'>
            <Container  maxWidth={themeStretch ? false : 'lg'}>
                <Card>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800,padding:1 }}>
                        <h2
                        style={{ textAlign:'center', color:'#D35400'}}>Sample Order Items </h2>
                        <RedBar />
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={userList.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody >
                                    {sampleOrderItems.map((row) => {
                                        const { id, bold, itemCode, itemDescription, longDescription, quantity, unit, priceBeforeTax, discount, total } = row;
                                        const isItemSelected = selected.indexOf(itemCode) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                               
                                                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <Typography variant="subtitle2" noWrap>
                                                        {itemCode}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">{itemDescription}</TableCell>
                                                <TableCell align="left">{longDescription}</TableCell>
                                                <TableCell align="left">{quantity}</TableCell>
                                                <TableCell align="left">{unit}</TableCell>
                                                <TableCell align="left" sx={{ fontWeight:  bold ? 'bold' : '' } }>{priceBeforeTax}</TableCell>
                                                <TableCell align="left" sx={{ fontWeight:  bold ? 'bold' : '' } }>{discount}</TableCell>
                                                <TableCell align="left" sx={{ fontWeight:  bold ? 'bold' : '' } }>{total}</TableCell>
                                                <TableCell align="right">
                                                { bold ? null :  <UserMoreMenu onDelete={() => handleDeleteUser(id)} handleEditEvent={() => handleEditEvent(row)} userName={itemCode} />}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
                 <DialogAnimate modalWidth='md' open={isOpenModal} onClose={handleCloseModal}>
                    <DialogTitle>{selectedsampleOrder ? 'Edit Sample Order Items' : 'Add Sample Order Items'}</DialogTitle>

                    <SampleOrderItemsForm sampleOrderItems={sampleOrderItems} setsampleOrderItems={setsampleOrderItems} event={selectedsampleOrder || {}} range={selectedRange} onCancel={handleCloseModal}/>
                </DialogAnimate>
            </Container>
        </Page>
    );
}

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return array.filter((_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}
