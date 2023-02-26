    import React, { useState } from 'react';
    import * as Yup from 'yup';
    import { useSnackbar } from 'notistack';
    import { useCallback } from 'react';
    // form
    import Avatar from '@mui/material/Avatar';
    import { useForm } from 'react-hook-form';
    import { yupResolver } from '@hookform/resolvers/yup';
    // @mui
    import { Box, Grid, Card, Stack, Typography } from '@mui/material';
    import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
    import dayjs from 'dayjs';
    import TextField from '@mui/material/TextField';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { DatePicker } from '@mui/x-date-pickers/DatePicker';
    import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
    import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
    // hooks
    import useAuth from 'src/hooks/useAuth';
    // utils
    import { fData } from 'src/utils/formatNumber';
    // _mock
    import { countries } from 'src/_mock';
    // components
    import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
    import { whitespace } from 'stylis';
    import { red } from '@mui/material/colors';
    // ----------------------------------------------------------------------
    export default function ReceivePayment() {
        const { enqueueSnackbar } = useSnackbar();
        const [depositdate, setdepositDate] = useState(new Date());
        const { user } = useAuth();

        const UpdateUserSchema = Yup.object().shape({
            memo: Yup.string().required('Messege is required'),
        });
        const defaultValues = {
            intobank: '',
            reference: '',
            exchangerate: '',
            bankcharges: '',
            depositdate: '',
            cppd: '',
            wht: '',
            gst: '',
            amount: '',
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
            data.depositdate = depositdate 
            console.log("=======:::", data);
            try {
                await new Promise((resolve) => setTimeout(resolve, 500));
                enqueueSnackbar('Update success!');
            } catch (error) {
                console.error(error);
            }
        };
        // const handleDrop = useCallback(
        //     (acceptedFiles) => {
        //         const file = acceptedFiles[0];
        //         if (file) {
        //             setValue(
        //                 'photoURL',
        //                 Object.assign(file, 
        //                     preview: URL.createObjectURL(file),
        //                 })
        //             );
        //         }
        //     },
        //     [setValue]
        // );
        return (
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <Grid  px={1} py={1}  container spacing={1}  sx={{ border:1,borderColor:'#FB7600',borderRadius:1}} >
                    <Grid item xs={12} sm={6}md={6} >
                        <Card height={3} sx={{  p: 1, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }} >
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 1,
                                    columnGap: 1,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                }}
                            >
                                <Card sx={{p:3}}>
                                <RHFSelect name="fromcustomers" label="From Customer"  size='small' sx={{ mt:1}}>
                                    <option value="" />
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                <RHFSelect name="intobank" label="In To Bank Account"  size='small' sx={{mt:1}}>
                                    <option value="" />
                                    {countries.map((option) => (
                                        <option key={option.code} value={option.label}>
                                            {option.label}
                                        </option>
                                    ))}
                                </RHFSelect>
                                <RHFTextField name="reference" label="Reference" size='small' sx={{ mt:1}}/>
                           
                            </Card>
                            </Box>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}md={6}>
                        <Card sx={{  p: 1,background: 'rgba(145, 158, 171, 0.12)'}}>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 1,
                                    columnGap: 1,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                    }}
                                >
                                    <Card sx={{p:3}}>
                                    <RHFTextField name="exchangerate" label="Exchange Rate (PKR = 1)" size='small' sx={{mt:1}}/>
                                    <RHFTextField name="bankcharges" label="Bank Charges" size='small' sx={{mt:1}}/>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack spacing={3}>     
                                            <DesktopDatePicker
                                                container
                                                    label="Date Of Deposit"
                                                    value={depositdate}
                                                // minDate={dayjs('2017-01-01')}
                                                    onChange={(newValue) => {
                                                    setdepositDate(newValue);
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
    {/*----------------2nd Portion Detailing Code-------------------------------------------*/}
                <Grid mt={3} container spacing={1}>
                    <Grid item xs={12} md={12}>                 
                        <Card sx={{ p: 3, background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                        <h4 style={{marginBottom:15, marginTop:10, textAlign:'center', color:'#ff6347', fontSize:25}}>Amount and WHT Are In Customer's Currency </h4>
                            <Box
                                sx={{
                                    display: 'grid',
                                    rowGap: 2,
                                    columnGap: 2,
                                    gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(3, 1fr)' },
                                }}
                            >
                                <Card sx={{p:3}}>
                                <RHFTextField name="cppd" label="Customer Promte Payment Discount" size="small" sx={{ mt: 1,borderRadius:1 }}/>
                                </Card>
                                <Card sx={{p:3}}>
                                <RHFTextField name="wht" label="With Holding Tax" size="small" sx={{ mt: 1,borderRadius:1 }}/>
                                </Card>
                                <Card sx={{p:3}}>
                                <RHFTextField name="gst" label="GST WithHolding Amount" size="small" sx={{ mt: 1, borderRadius:1 }}/>
                                </Card>
                                <Card sx={{p:3}}>
                                <RHFTextField name="amount" label="Amount" size="small" sx={{ mt: 1, borderRadius:1 }}/>
                                </Card>
                                <Card sx={{p:3}}>
                                <RHFTextField name="memo" label="MEMO" multiline rows={4}  sx={{ mt: 1,borderRadius:1 }}/>
                                </Card>
                            </Box>  
                            <Stack spacing={1} alignItems="flex-end" sx={{ mt: 1,borderRadius: 1 }}>
                            <Box display={'flex'} sx={{justifyContent: 'center',m:5}} >
                                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                                     Update Payment
                                </LoadingButton>
                            </Box>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </FormProvider> 
        );
    }
