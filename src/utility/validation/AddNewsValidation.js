import * as yup from 'yup';
export const AddNewsValidation = yup.object().shape({
    firstName: yup.string().required('این فیلد الزامیست!'),
    lastName: yup.string().required('این فیلد الزامیست!'),
    gmail: yup.string().email("  ایمیل را به درستی وارد کنید").required("Mail is required").typeError('ایمیل را به درستی وارد کنید').required('این فیلد الزامیست!'),
    password: yup.string().required('این فیلد الزامیست!'),
    phoneNumber: yup.number().min(9000000000,"شماره موبایل باید 11 رقم باشد").max(9999999999,"شماره موبایل نباید بیشتر از 11 رقم باشد").required('این فیلد الزامیست!'),
    // isStudent: yup.boolean().required('این فیلد الزامیست!'),
    // isTeacher: yup.boolean().required('این فیلد الزامیست!'),
})