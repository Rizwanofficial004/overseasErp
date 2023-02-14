import PropTypes from 'prop-types';
import * as Yup from 'yup';
import merge from 'lodash/merge';
import { isBefore } from 'date-fns';
import { useSnackbar } from 'notistack';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { countries } from 'src/_mock';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// @mui
import { Box, Stack, Button, Tooltip, TextField, IconButton, DialogActions } from '@mui/material';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
// redux
import { useDispatch } from 'src/redux/store';
import { createEvent, updateEvent, deleteEvent } from 'src/redux/slices/calendar';
// components
import Iconify from 'src/components/Iconify';
import { ColorSinglePicker } from 'src/components/color-utils';
import { FormProvider, RHFTextField, RHFSwitch,RHFSelect } from 'src/components/hook-form';

// ----------------------------------------------------------------------

const COLOR_OPTIONS = [
  '#00AB55', // theme.palette.primary.main,
  '#1890FF', // theme.palette.info.main,
  '#54D62C', // theme.palette.success.main,
  '#FFC107', // theme.palette.warning.main,
  '#FF4842', // theme.palette.error.main
  '#04297A', // theme.palette.info.darker
  '#7A0C2E', // theme.palette.error.darker
];

const getInitialValues = (event) => {
    const _event = {
        categoryname:'',
        itemtaxtype:'',
        itemtype:'',
        unitsofmeasure:'',
        salesaccount:'',
        inventoryaccount:'',
        cogsaccount:'',
        inventoryadjustmentaccount:'',
        textColor: '#1890FF',
  };

  if (event) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

CategoryForm.propTypes = {
  event: PropTypes.object,
  // range: PropTypes.object,
  onCancel: PropTypes.func,
};

export default function CategoryForm({ event, onCancel, categoryitems, setcategoryitems }) {
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();


  const EventSchema = Yup.object().shape({
    
    
  });

  const methods = useForm({
    // resolver: yupResolver(EventSchema),
    defaultValues: getInitialValues(event),
  });

  const {
    reset,
    watch,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    console.log(">>>>>>>>>>:::", data);
    setcategoryitems([...categoryitems, data])
    onCancel();
      reset();
    // try {
    //   const newEvent = {
    //     title: data.title,
    //     description: data.description,
    //     textColor: data.textColor,
    //     allDay: data.allDay,
    //     start: data.start,
    //     end: data.end,
    //   };
    //   if (event.id) {
    //     dispatch(updateEvent(event.id, newEvent));
    //     enqueueSnackbar('Update success!');
    //   } else {
    //     enqueueSnackbar('Create success!');
    //     dispatch(createEvent(newEvent));
    //   }
    //   onCancel();
    //   reset();
    // } catch (error) {
    //   console.error(error);
    // }
  };


  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} sx={{ p: 3 }}>

       
        <RHFTextField name="categoryname" label="Category Name    " />
        <RHFSelect name="itemtaxtype" label="Item Tax Type" placeholder="Item Tax Type">
            <option value="" />
            {countries.map((option) => (
                <option key={option.code} value={option.label}>
                {option.label}
                </option>
            ))}
        </RHFSelect>
        <RHFSelect name="itemtype" label="Item Type" placeholder="Item Type">
            <option value="" />
            {countries.map((option) => (
                <option key={option.code} value={option.label}>
                {option.label}
                </option>
            ))}
        </RHFSelect>
        <RHFSelect name="unitsofmeasure" label="Units Of Measure" placeholder="Units Of Measure">
            <option value="" />
            {countries.map((option) => (
                <option key={option.code} value={option.label}>
                {option.label}
                </option>
            ))}
        </RHFSelect>
        <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Exclude From Sales" />
            
            </FormGroup>
        <RHFSelect name="salesaccount" label="Sales Account" placeholder="Sales Account">
            <option value="" />
            {countries.map((option) => (
                <option key={option.code} value={option.label}>
                {option.label}
                </option>
            ))}
        </RHFSelect>
        <RHFSelect name="inventoryaccount" label="Inventory Account" placeholder="Inventory Account">
            <option value="" />
            {countries.map((option) => (
                <option key={option.code} value={option.label}>
                {option.label}
                </option>
            ))}
        </RHFSelect>
        <RHFSelect name="cogsaccount" label="C.O.G.S Account" placeholder="C.O.G.S Account">
            <option value="" />
            {countries.map((option) => (
                <option key={option.code} value={option.label}>
                {option.label}
                </option>
            ))}
        </RHFSelect>
        <RHFSelect name="inventoryadjustmentaccount" label="Inventory Adjustment Account" placeholder="Inventory Adjustment Account">
            <option value="" />
            {countries.map((option) => (
                <option key={option.code} value={option.label}>
                {option.label}
                </option>
            ))}
        </RHFSelect>
      </Stack>

      <DialogActions>
        <Box sx={{ flexGrow: 1 }} />

        <Button variant="outlined" color="inherit" onClick={onCancel}>
          Cancel
        </Button>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting} loadingIndicator="Loading...">
          Add
        </LoadingButton>
      </DialogActions>
    </FormProvider>
  );
}
