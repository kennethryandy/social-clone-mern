import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Toast = ({ open, message, handleClose }) => {
	return (
		<Snackbar
			open={open}
			autoHideDuration={6000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
		>
			<Alert severity="error">{message}</Alert>
		</Snackbar>
	)
}

export default Toast