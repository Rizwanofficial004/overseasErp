import { sentenceCase } from 'change-case';
import { useState } from 'react';

import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from 'src/hooks/useAuth';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    Box, 
    Grid,
    Card,
    Stack,
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

import useSettings from 'src/hooks/useSettings';
// _mock_
import { _userList, _exchangerate} from 'src/_mock';
// components
import Page from 'src/components/Page';
import Iconify from 'src/components/Iconify';
import Scrollbar from 'src/components/Scrollbar';
import SearchNotFound from 'src/components/SearchNotFound';
// sections
import { UserListHead, UserListToolbar, UserMoreMenu } from 'src/sections/@dashboard/user/list';
import { DialogAnimate } from 'src/components/animate';


import { useDispatch, useSelector } from 'react-redux';
import useResponsive from 'src/hooks/useResponsive';
import { getEvents, openModal, closeModal, updateEvent, selectEvent, selectRange } from 'src/redux/slices/calendar';

import { FormProvider, RHFTextField,  } from 'src/components/hook-form';
import CurrencyItemsForm from 'src/sections/@dashboard/calendar/generalledger/CurrencyItemsForm';
import ExchangeRateItemsForm from 'src/sections/@dashboard/calendar/generalledger/ExchangeRateItemsForm';

// ----------------------------------------------------------------------


    export default function ExchangeRate() {
    
    const theme = useTheme();
    const { themeStretch } = useSettings();
    const [userList, setUserList] = useState(_userList);
    const [exchangerate, setexchangerate] = useState([..._exchangerate]);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [selectedexchangerate, setSelectedexchangerate] = useState(null)
    const { enqueueSnackbar } = useSnackbar();
    // const [quotationDate, setQuotationDate] = useState(new Date());
   
    const {user} = useAuth();
    const UpdateUserSchema = Yup.object().shape({
        // purchaseOrder: Yup.string().required('purchase order is required'),
        // customers: Yup.string().required('purchase order is required'),
        // branch: Yup.string().required('purchase order is required'),
        // exchangeRate: Yup.string().required('purchase order is required'),
        // quotationDate: Yup.string().required('purchase order is required'),
        // deliverFromLocation: Yup.string().required('purchase order is required'),
        // quotationDeliveryDate: Yup.string().required('purchase order is required'),
        // deliveryTo: Yup.string().required('purchase order is required'),
    });
    const defaultValues = {
        item: '',
        itemcode:'',
    };
    const methods = useForm({
        resolver: yupResolver(UpdateUserSchema),
        defaultValues,
    });
    const {
        setValue,
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const onSubmit = async (data) => {
        // data.quotationDate = quotationDate
        // data.quotationDeliveryDate = quotationDeliveryDate
        // data.purchaseOrderDate = purchaseOrderDate
        console.log("=======:::", data);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            enqueueSnackbar('Update success!');
        } catch (error) {
            console.error(error);
        }
    };
   
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
            { id: 'role', label: 'Date Of Use From ', alignRight: false },
            { id: 'name', label: 'Excange Rate', alignRight: false },
            { id: '', label: <AddButton />,  alignRight: false },
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
        setSelectedexchangerate(obj)
        dispatch(openModal());
    };  

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && Boolean(filterName);
   

    return (
        <Page title="User: List" padding='1.5rem'>
              <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} sx={{border:1,borderColor:'black'}}>
                        <Grid   py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >                        
                         <Grid item xs={12} sm={6} md={12}>
                            <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                                <Box
                                    sx={{
                                        display: 'grid',
                                        rowGap: 2,
                                        columnGap: 1,
                                        
                                        gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                        
                                        }}
                                >
                                     <Card sx={{p:2}}> 
                                    <RHFTextField name="Currency" label="currency" size='small'  sx={{ borderColor:'#FF0000', borderRadius:1}} />
                                   </Card>
                                </Box>
                            </Card>
                        </Grid> 
                    </Grid>           
            </FormProvider>
            
            <Container  maxWidth={themeStretch ? false : 'lg'}>
                <Card mt={3}>
                    <Scrollbar>
                        <TableContainer sx={{mt:3, minWidth: 1000 }}>
                        <h4 style={{marginBottom:15, marginTop:10, textAlign:'center', color:'#ff6347', fontSize:30}}> Exchange Rate Details</h4>
                            <Table>
                                <UserListHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={exchangerate.length}
                                    numSelected={selected.length}
                                    onRequestSort={handleRequestSort}
                                    onSelectAllClick={handleSelectAllClick}
                                />
                                <TableBody >
                                    {exchangerate.map((row) => {
                                        const { id, bold, 
                                            dateofusefrom,
                                            exchangerate,
                                        } = row;
                                        const isItemSelected = selected.indexOf(exchangerate) !== -1;
                                        return (
                                            <TableRow
                                                hover
                                                key={id}
                                                tabIndex={-1}
                                                role="checkbox"
                                                selected={isItemSelected}
                                                aria-checked={isItemSelected}
                                            >
                                                {/* <TableCell padding="checkbox" >
                                                    <Checkbox checked={isItemSelected} onClick={() => handleClick(itemCode)} />
                                                </TableCell> */}
                                                <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                                                    {/* <Avatar alt={name} src={avatarUrl} sx={{ mr: 2 }} /> */}
                                                    <Typography variant="subtitle2" noWrap>
                                                        {exchangerate}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="left">{dateofusefrom}</TableCell>
                                                <TableCell align="right">
                                                <UserMoreMenu onDelete={() => handleDeleteUser(id)} handleEditEvent={() => handleEditEvent(row)} userName={exchangerate} />
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
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                                <SearchNotFound searchQuery={filterName} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                </Card>
                 <DialogAnimate modalWidth='sm' open={isOpenModal} onClose={handleCloseModal}>
                    <DialogTitle>{selectedexchangerate? 'Edit Currency Details' : 'Add Currency'}</DialogTitle>
                    <ExchangeRateItemsForm exchangerate={exchangerate} setexchangerate={setexchangerate} event={selectedexchangerate || {}} range={selectedRange} onCancel={handleCloseModal} />
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
