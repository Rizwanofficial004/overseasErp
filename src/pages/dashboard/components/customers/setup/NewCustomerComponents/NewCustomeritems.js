import React, { useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from 'src/hooks/useAuth';
// _mock
import { countries } from 'src/_mock';
// components
import { FormProvider, RHFSelect, RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------
export default function NewCustomeritems(){
    const { enqueueSnackbar } = useSnackbar();
    const [date, setDate] = useState(new Date());
    const { user } = useAuth();
    
    const UpdateUserSchema = Yup.object().shape({
        displayName: Yup.string().required('Name is required'),
    });
    const AddButton = () => {
        return (
            <Button
                // component={RouterLink}
                // to={PATH_DASHBOARD.user.newUser}
            >
                Add
            </Button>
            )
        }
        const defaultValues = {
          
            defaultinventorylocation: '',
            defaultshippingcompany: '',
            salesarea: '',
            taxgroup: '',
            otherdetails: '',
            discountpercent: '',
            promotepaymentdiscount: '',
            Creditlimit: '',
            paymentterms: '',
            creditstatus: '',
            generalnotes: '',
            customername: '',
            customershortname: '',
            address: '',
            ntnnumber: '',
            gstnumber: '',
            customercurrency: '',
            salestype: '',
            phone: '',
            secondaryphonenumber: '',
            faxnumber: '',
            email: '',
            salesperson: '',
    
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
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} >
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Card sx={{ p: 3,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }}>
                        <h4 style={{marginBottom:15,marginTop:10, textAlign:'center', color:'black'}}> CUSTOMER DETAILS </h4>
                        <Box
                        sx={{
                            display: 'grid',
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
                        }}
                        >
                            <Grid mt={3} container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ p: 3 }}>  
                                        <RHFTextField name="customername" label="Customer Name" size='small'  sx={{ mt: 1,color:'#FF0000',borderColor:'#FF0000', borderRadius:1}} />
                                        <RHFTextField name="customershortname" label="Customer Short Name" size='small'  sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}/>
                                        <RHFTextField name="address" label="Address" size='small' sx={{  mt: 1,borderColor:'#FF0000', borderRadius:1}}/>
                                        <RHFTextField name="ntnnumber" label="NTN Number" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}/>
                                        <RHFTextField name="gstnumber" label="GST Number" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}/>
                                        <RHFSelect name="customercurrency" label="Customer Currency" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}>
                                            <option value="" />
                                            {countries.map((option) => (
                                            <option key={option.code} value={option.label}>
                                                {option.label}
                                            </option>
                                            ))}
                                        </RHFSelect>
                                    </Card>
                                </Grid>
                            </Grid>
                            <Grid mt={3} container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ p: 3 }}> 
                                        <RHFSelect name="salestype" label="Sales Type / Price List" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}>
                                            <option value="" />
                                            {countries.map((option) => (
                                            <option key={option.code} value={option.label}>
                                                {option.label}
                                            </option>
                                            ))}
                                        </RHFSelect>
                                        <RHFTextField name="phone"  label="Phone" size='small' sx={{  mt: 1,borderColor:'#FF0000', borderRadius:1}}/>
                                        <RHFTextField name="secondaryphonenumber"  label="Secondary Phone Number" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}/>
                                        <RHFTextField name="faxnumber"  label="Fax Number" size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}/>
                                        <RHFTextField name="email"  label="E-mail" size='small' sx={{  mt: 1, borderRadius:1}}/>
                                        <RHFSelect name="salesperson" label="Sales Person" size='small' sx={{  mt: 1,borderColor:'#FF0000', borderRadius:1}}>
                                            <option value="" />
                                            {countries.map((option) => (
                                            <option key={option.code} value={option.label}>
                                                {option.label}
                                            </option>
                                            ))}
                                        </RHFSelect>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
            <Grid  px={1} py={1}  container spacing={1}   >
                <Grid item xs={12} sm={6} md={6} >
                    <Card height={3} sx={{  p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1  }} >
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                            }}
                        >
                            <h4 style={{ textAlign:'center', color:'black'}}>BRANCH</h4>

                            <Grid mt={3} container spacing={1}>
                                <Grid item xs={12} md={12}>
                                <Card sx={{ p: 3 }}>
                                    <RHFSelect name="defaultinventorylocation" label="Default Inventory Location"  size='small' sx={{ mt: 1, borderColor:'#FF0000', borderRadius:1}}>
                                        <option value="" />
                                        {countries.map((option) => (
                                            <option key={option.code} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </RHFSelect>
                                    <RHFSelect name="defaultshippingcompany" label="Default Shipping Company" size='small' sx={{  mt: 1,borderRadius:1}}>
                                        <option value="" />
                                        {countries.map((option) => (
                                            <option key={option.code} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </RHFSelect>
                                    <RHFSelect name="salesarea" label="Sales Area" size='small' sx={{ mt: 1, borderRadius:1}}>
                                        <option value="" />
                                        {countries.map((option) => (
                                            <option key={option.code} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </RHFSelect>
                                    <RHFSelect name="taxgroup" label="Tax Group" size='small' sx={{ mt: 1, borderRadius:1}}>
                                        <option value="" />
                                        {countries.map((option) => (
                                            <option key={option.code} value={option.label}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </RHFSelect>
                                    <RHFTextField name="otherdetails" label="OTHER Details" multiline rows={6.2} size='small' sx={{ mt: 1, borderRadius:1,}}/>
                                </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6} md={6}>
                    <Card sx={{ p: 1,background: 'rgba(145, 158, 171, 0.12)',borderRadius:1 }}>
                        <Box
                            sx={{
                                display: 'grid',
                                rowGap: 2,
                                columnGap: 1,
                                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)' },
                                
                                }}
                        >
                            <h4 style={{ textAlign:'center', color:'black'}}>SALES</h4>
                            <Grid mt={3} container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <Card sx={{ p: 3 }}>  
                                        <RHFTextField name="discountpercent" label="Discount Percent %" size='small' sx={{  mt: 1,borderRadius:1 }}  />
                                        <RHFTextField name="promotepaymentdiscount" label="Prompt Payment Discount Percent % " size='small' sx={{ mt: 1, borderRadius:1}}/>
                                        <RHFTextField name="Creditlimit" label="Credit Limit" size='small' sx={{ mt: 1, borderRadius:1}}/>
                                        <RHFTextField name="paymentterms" label="Payment Terms" size='small' sx={{ mt: 1, borderRadius:1}}/>
                                        <RHFTextField name="creditstatus" label="Credit Status" size='small' sx={{  mt: 1,borderRadius:1}}/>
                                        <RHFTextField name="generalnotes" label="General Notes" multiline rows={4} size='small' sx={{ mt: 1, borderRadius:1}}/>
                                    </Card>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>             
            </Grid>  
            <Stack spacing={1} alignItems="flex-bottom" sx={{ mt: 1,borderRadius: 1 }}>
                <Box display={'flex'} sx={{justifyContent: 'center',m:5}} >           
                    <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        Submit
                    </LoadingButton>
                </Box>
            </Stack>  
        </FormProvider>
        );
    }
