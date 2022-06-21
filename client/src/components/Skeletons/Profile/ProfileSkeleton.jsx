import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const ProfileSkeleton = () => {
	return (
		<Paper elevation={3} sx={{ marginBottom: 3, paddingY: 3 }}>
			<Stack
				spacing={1}
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Skeleton variant="circular" width={240} height={240} />
				<Skeleton variant="text" width={80} height={40} />
				<Skeleton variant="rectangular" width={200} height={25} />
				<Skeleton variant="rectangular" width={200} height={25} />
				<Skeleton variant="rectangular" width={200} height={25} />
			</Stack>
		</Paper>
	);
};

export default ProfileSkeleton;
