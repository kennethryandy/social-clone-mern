import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, setError, clearErrors } from '../features/user/userSlice';
import { loginSchema } from '../utils/validators';
import { Link } from 'react-router-dom';
// MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
// Icons
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Toast from '../components/Snackbar/Toast';


const Login = () => {
	const { loading, errors } = useSelector(store => store.user);
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = useState(false);
	const [inputField, setInputField] = useState({
		email: "",
		password: ""
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

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(setError({}));
		try {
			const user = await loginSchema.validate(inputField, { abortEarly: false });
			dispatch(loginUser({
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
					<Typography textAlign="center" variant="h3" sx={{ fontWeight: "600" }} color="primary">Log in</Typography>
				</Box>
				<form onSubmit={handleSubmit}>
					<Box sx={{ marginY: { xs: 2, md: 3 }, paddingX: { xs: 2, md: 3 }, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: { xs: 2, md: 3 } }}>
						<TextField
							label="Email address"
							placeholder="Your email address..."
							fullWidth
							name="email"
							type="email"
							value={inputField.email}
							onChange={handleChange}
							error={!!errors.email || !!errors.general}
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
											type={showPassword ? 'text' : 'password'}
											value={inputField.password}
											onChange={handleChange}
											error={!!errors.password || !!errors.general}
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														tabIndex={-1}
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														edge="end"
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
											label="Password"
										/>
									</FormControl>
								</Box>
							</Box>
						</Box>
						<Box>
							<Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>Login</Button>
							<Typography component="div" sx={{ marginY: 1 }} variant="caption" textAlign="center">
								<span>Don't have an account? Register </span>
								<MuiLink color="secondary" component={Link} to="/register" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>here <ExitToAppIcon sx={{ marginX: "2px" }} /></MuiLink>
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

export default Login