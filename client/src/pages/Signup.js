import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const Register = () => {
	const { loading } = useSelector(store => store.user);
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

	const handleChange = e => {
		setInputField({
			...inputField,
			[e.target.name]: e.target.value
		});
	}

	const handleClickShowPassword = (e) => {
		setShowPassword({
			...showPassword,
			[e.target.id]: !showPassword[e.target.id]
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(inputField);

	}

	return (
		<Box sx={{ maxWidth: "sm", margin: "auto" }}>
			<Box>
				<Typography textAlign="center" variant="h2" sx={{ fontWeight: "600" }} color="primary">Signup</Typography>
			</Box>
			<form onSubmit={handleSubmit}>
				<Box sx={{ marginY: { xs: 2, md: 3 }, paddingX: { xs: 2, md: 3 }, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: { xs: 2, md: 3 } }}>
					<Box sx={{ width: "100%", display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3 } }}>
						<TextField
							label="First Name"
							placeholder="Your first name..."
							multiline
							fullWidth
							name="fname"
							value={inputField.fname}
							onChange={handleChange}
						/>
						<TextField
							label="Last Name"
							placeholder="Your last name..."
							multiline
							fullWidth
							name="lname"
							value={inputField.lname}
							onChange={handleChange}
						/>
					</Box>
					<TextField
						label="Email address"
						placeholder="Your email address..."
						multiline
						fullWidth
						name="email"
						type="email"
						value={inputField.email}
						onChange={handleChange}
					/>
					<Box sx={{ width: "100%", display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3 } }}>
						<FormControl variant="outlined" fullWidth>
							<InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
							<OutlinedInput
								id="outlined-adornment-password"
								name="password"
								type={showPassword.password ? 'text' : 'password'}
								value={inputField.password}
								onChange={handleChange}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end"
											id="password"
										>
											{showPassword.password ? <VisibilityOff id="password" /> : <Visibility id="password" />}
										</IconButton>
									</InputAdornment>
								}
								label="Password"
							/>
						</FormControl>
						<FormControl variant="outlined" fullWidth>
							<InputLabel htmlFor="outlined-adornment-confirm-password">Confirm Password</InputLabel>
							<OutlinedInput
								id="outlined-adornment-confirm-password"
								name="confirmPassword"
								type={showPassword.confirmPassword ? 'text' : 'password'}
								value={inputField.confirmPassword}
								onChange={handleChange}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end"
											id="confirmPassword"
										>
											{showPassword.confirmPassword ? <VisibilityOff id="confirmPassword" /> : <Visibility id="confirmPassword" />}
										</IconButton>
									</InputAdornment>
								}
								label="Confirm Password"
							/>
						</FormControl>
					</Box>
					<Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>submit</Button>
				</Box>
			</form>
		</Box >
	)
}

export default Register