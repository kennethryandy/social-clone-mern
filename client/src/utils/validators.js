import { object, string, ref } from 'yup';

export const userSchema = object().shape({
	fname: string().min(2, "Must be at least 2 characters.").required('First name must not be empty.'),
	lname: string().min(2, "Must be at least 2 characters.").required('Last name must not be empty.'),
	email: string().email('Invalid email address.').required('Email address must not be empty.'),
	password: string().min(6, 'Password must be atleast 6 characters.').max(30).oneOf([ref('confirmPassword'), null], 'Password and confirm password must match.').trim().required('Password must not be empty.'),
	confirmPassword: string().oneOf([ref('password'), null], 'Password and confirm password must match.').required('Confirm password must not be empty.')
});

export const loginSchema = object().shape({
	email: string().email('Invalid email address.').required('Email address must not be empty.'),
	password: string().min(6, 'Password must be atleast 6 characters.').max(30).trim().required('Password must not be empty.')
});