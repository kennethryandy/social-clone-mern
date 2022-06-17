import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, setError, clearErrors } from '../features/user/userSlice';
import { userSchema } from '../utils/validators';
import { Link } from 'react-router-dom';
// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { capitalize } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Toast from '../components/Snackbar/Toast';
// Icons
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SendIcon from '@mui/icons-material/Send';
import CircularProgress from '@mui/material/CircularProgress';


const Register = () => {
	const { loading, errors } = useSelector(store => store.user);
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState({
		password: false,
		confirmPassword: false
	});
	const [inputField, setInputField] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		confirmPassword: ""
	});

	useEffect(() => {
		dispatch(clearErrors());
	}, [dispatch]);

	const handleChange = e => {
		setInputField({
			...inputField,
			[e.target.name]: e.target.value
		});
		if (errors[e.target.name]) {
			dispatch(setError({ ...errors, [e.target.name]: "" }));
		}
	}

	const handleClickShowPassword = (name) => {
		setShowPassword({
			...showPassword,
			[name]: !showPassword[name]
		});
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(setError({}));
		try {
			const user = await userSchema.validate(inputField, { abortEarly: false });
			const fnameCap = user.fname.split(" ").map(c => capitalize(c)).join(" ").trim();
			const lnameCap = user.lname.split(" ").map(c => capitalize(c)).join(" ").trim();
			dispatch(registerUser({
				fullname: `${fnameCap} ${lnameCap}`,
				email: user.email,
				password: user.password
			}));
		} catch (err) {
			if (err?.name === "ValidationError") {
				const yupErrors = err.inner.reduce((acc, curr) => {
					return {
						...acc,
						[curr.path]: curr.message
					}
				}, {});
				dispatch(setError(yupErrors));
			} else {
				console.log(err);
			}
		}
	}

	const handleSnackbarClose = () => {
		dispatch(setError({ general: '' }));
	}

	return (
		<>
			<Box sx={{ maxWidth: "sm", margin: "auto" }}>
				<Box>
					<Typography textAlign="center" variant="h3" sx={{ fontWeight: "600" }} color="primary">Create an account</Typography>
				</Box>
				<form onSubmit={handleSubmit}>
					<Box sx={{ marginY: { xs: 2, md: 3 }, paddingX: { xs: 2, md: 3 }, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: { xs: 2, md: 3 } }}>
						<Box sx={{ width: "100%", display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3 } }}>
							<TextField
								label="First Name"
								placeholder="Your first name..."
								fullWidth
								name="fname"
								value={inputField.fname}
								onChange={handleChange}
								error={!!errors.fname}
								helperText={errors.fname}
								inputProps={{ style: { textTransform: "capitalize" } }}
							/>
							<TextField
								label="Last Name"
								placeholder="Your last name..."
								fullWidth
								name="lname"
								value={inputField.lname}
								onChange={handleChange}
								error={!!errors.lname}
								helperText={errors.lname}
								inputProps={{ style: { textTransform: "capitalize" } }}
							/>
						</Box>
						<TextField
							label="Email address"
							placeholder="Your email address..."
							fullWidth
							name="email"
							type="email"
							value={inputField.email}
							onChange={handleChange}
							error={!!errors.email}
							helperText={errors.email}
						/>
						<Box width="100%">
							<Box sx={{ width: "100%", display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3 } }}>
								<Box width="100%">
									<FormControl variant="outlined" fullWidth>
										<InputLabel error={!!errors.password} htmlFor="outlined-adornment-password">Password</InputLabel>
										<OutlinedInput
											id="outlined-adornment-password"
											name="password"
											type={showPassword.password ? 'text' : 'password'}
											value={inputField.password}
											onChange={handleChange}
											error={!!errors.password}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														tabIndex={-1}
														aria-label="toggle password visibility"
														onClick={() => handleClickShowPassword("password")}
														edge="end"
													>
														{showPassword.password ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
											label="Password"
										/>
									</FormControl>
									{!!errors.password ? (
										<Box sx={{
											marginTop: "3px",
											marginRight: "14px",
											marginBottom: 0,
											marginLeft: "14px",
											width: "100%"
										}}>
											<Typography variant="caption" color="error" >
												{errors.password}
											</Typography>
										</Box>
									) : null}
								</Box>
								<Box width="100%">
									<FormControl variant="outlined" fullWidth>
										<InputLabel error={!!errors.confirmPassword} htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
										<OutlinedInput
											id="outlined-adornment-confirm-password"
											name="confirmPassword"
											type={showPassword.confirmPassword ? 'text' : 'password'}
											value={inputField.confirmPassword}
											error={!!errors.confirmPassword}
											onChange={handleChange}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														tabIndex={-1}
														onClick={() => handleClickShowPassword("confirmPassword")}
														edge="end"
													>
														{showPassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
											label="Confirm Password"
										/>
									</FormControl>
									{!!errors.confirmPassword ? (
										<Box sx={{
											marginTop: "3px",
											marginRight: "14px",
											marginBottom: 0,
											marginLeft: "14px",
											width: "100%"
										}}>
											<Typography variant="caption" color="error" >
												{errors.confirmPassword}
											</Typography>
										</Box>
									) : null}
								</Box>
							</Box>
						</Box>
						<Box>
							<Button type="submit" variant="contained" size="large" fullWidth disabled={loading} endIcon={loading ? <CircularProgress color="info" size="1em" /> : <SendIcon />}>Register</Button>
							<Typography component="div" sx={{ marginY: 1 }} variant="caption" textAlign="center">
								<span>Already have an account? Log in </span>
								<MuiLink color="secondary" component={Link} to="/login" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>here <ExitToAppIcon sx={{ marginX: "2px" }} /></MuiLink>
							</Typography>
						</Box>
					</Box>
				</form>
			</Box >
			<Toast
				open={errors.general ? true : false}
				message={errors.general ? errors.general : ""}
				handleClose={handleSnackbarClose}
			/>
		</>
	)
}

export default Register