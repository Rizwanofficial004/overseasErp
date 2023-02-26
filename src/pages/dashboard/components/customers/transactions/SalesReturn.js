    import React, { useState } from 'react';
    import * as Yup from 'yup';
    import { useSnackbar } from 'notistack';
    import { useCallback } from 'react';
    // form
    import { useForm } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    // @mui
    import { Box, Grid, Card, Stack} from '@mui/material';
    import { LoadingButton } from '@mui/lab';
    import TextField from '@mui/material/TextField';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
    // hooks
    import useAuth from 'src/hooks/useAuth';
    // _mock
    import { countries } from 'src/_mock';
    // components
    import { FormProvider, RHFSwitch, RHFSelect, RHFTextField} from 'src/components/hook-form';
    import SalesReturnItems from './salesReturnComponents/SalesReturnItems';
  

    // ----------------------------------------------------------------------

    export default function SalesReturn() {
        const { enqueueSnackbar } = useSnackbar();
        const [salesreturndate, setsalesReturnDate] = useState(new Date());
        const { user } = useAuth();

        const UpdateUserSchema = Yup.object().shape({
            displayName: Yup.string().required('Name is required'),
        });

        const defaultValues = {
            customers: '',
            branch: '',
            reference: '',
            currentCredit: '',
            exchangeRate: '',
            InvoiceNumber: '',
            payment: '',
            salesPerson: '',
            salesreturndate: '',
            CreditNoteType: '',
            ItemsReturned: '',
            memo: '',
    
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
            data.salesreturndate = salesreturndate
            console.log("=======:::", data);
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                enqueueSnackbar('Update success!');
            } catch (error) {
                console.error(error);
            }
        };

        const handleDrop = useCallback(
            (acceptedFiles) => {
                const file = acceptedFiles[0];

                if (file) {
                    setValue(
                        'photoURL',
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    );
                }
            },
            [setValue]
        );

        return (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} sx={{border:1,borderColor:'black'}}>
                <Grid  px={1} py={1}  container spacing={1} sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >
                    <Grid item xs={12} sm={6}md={4}>
                        <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 2,
                                    columnGap: 1,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                }}
                            >
                                <Card sx={{p:3}}>
                                <RHFSelect name="customers" label="Customers"  size='small' sx={{ mt:1}}>
                                    <option value="" />
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                <RHFSelect name="branch" label="Branch" size='small' sx={{mt:1}}>
                                    <option value="" />
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                <RHFTextField name="reference" label="Reference"  size='small' sx={{ mt:1}}/>
                                </Card>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}md={4}>
                        <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 2,
                                    columnGap: 1,
                                    
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                    
                                    }}
                            >
                                <Card sx={{p:3}}>
                                <RHFTextField name="InvoiceNumber" label="Invoice Number" size='small' sx={{mt:1 }}  />
                                <RHFTextField name="exchangeRate" label="Exchange Rate" size='small' sx={{mt:1}}/>
                                <RHFTextField name="currentCredit" label="Current Credit" size='small' sx={{mt:1}}/>  
                                </Card>
                            </Box>
                        </Card>
                    </Grid>             
                    <Grid item xs={12} sm={6}md={4}>
                        <Card sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1}}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 2,
                                    columnGap: 1,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                }}
                            >
                                <Card sx={{p:3}}>
                                <RHFSelect name="payment" label="Shipping Company" placeholder="Payment" size='small'sx={{mt:1}}>
                                    <option value="" />
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                <RHFSelect name="salesPerson" label="Sales Type" placeholder="Sales Person" size='small' sx={{mt:1}}>
                                    <option value="" />
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack spacing={3}>
                                        <DesktopDatePicker
                                        container
                                            label="Date"
                                            value={salesreturndate}
                                            // minDate={dayjs('2017-01-01')}
                                            onChange={(newValue) => {
                                                setsalesReturnDate(newValue);
                                            }}
                                            renderInput={(params) => <TextField {...params} size='small' sx={{mt:1}}/>}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Card>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
    {/*----------------SALES TABLE CALLING-------------------------------------------*/}
                <SalesReturnItems  />
    {/*----------------3rd portion Detailing Code-------------------------------------------*/}
                <Grid mt={2} container spacing={1}>
                    <Grid item xs={6} md={12}>
                        <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                        <h4 style={{marginBottom:15, marginTop:10, textAlign:'center', color:'#ff6347', fontSize:25}}>Sales Return Details </h4>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 2,
                                    columnGap: 2,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                                }}
                            >
                                <Card sx={{p:3}}>
                                <RHFSelect name="CreditNoteType" label="Credit Note Type"  size='small' sx={{ mt: 1,mt:1}}>
                                    <option value=""/>
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                </Card>
                                <Card sx={{p:3}}>
                                <RHFSelect name="ItemsReturned" label="Items Returned To Location"  size='small' sx={{mt: 1,mt:1}}>
                                    <option value=""/>
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                </Card>
                                </Box>
                        <Grid mt={3} container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Card sx={{ p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                                    <Box>
                                    <Card sx={{p:3}}>
                                        <RHFTextField name="memo" label="MEMO" multiline rows={4}  sx={{ mt: 1,mt:1 }}/>
                                    </Card>
                                    </Box>           
                                </Card>
                            </Grid>
                        </Grid>
                        <Stack spacing={1} alignItems="flex-end" sx={{ mt: 1,borderRadius: 1 }}>
                            <Box display={'flex'} >
                            <Box m={1}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Update
                                </LoadingButton>
                            </Box>
                            <Box m={1}>
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                    Process Credit Note
                                </LoadingButton>
                            </Box>
                            </Box>
                        </Stack>
                        
                        </Card>
                    </Grid>

                </Grid>
            </FormProvider> 
        );
    }
