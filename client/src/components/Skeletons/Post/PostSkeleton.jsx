import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const PostSkeleton = () => {
	return (
		<>
			{[1, 2, 3, 4, 5].map((i) => (
				<Paper
					key={i}
					elevation={3}
					sx={{
						marginBottom: 3,
						padding: 2,
						width: "100%",
						boxSizing: "border-box",
					}}
				>
					<Stack spacing={1}>
						<Box sx={{ display: "flex", gap: 1 }}>
							<Skeleton
								variant="circular"
								width={40}
								height={40}
							/>
							<Box>
								<Skeleton variant="text" width={60} />
								<Skeleton variant="text" width={40} />
							</Box>
						</Box>
						<Box sx={{ display: "flex", gap: 1 }}>
							<Skeleton
								variant="rectangular"
								width={120}
								height={20}
							/>
							<Skeleton
								variant="rectangular"
								width={120}
								height={20}
							/>
						</Box>
						<Skeleton
							variant="rectangular"
							width="65%"
							height={20}
						/>
						<Skeleton
							variant="rectangular"
							width="90%"
							height={20}
						/>
					</Stack>
				</Paper>
			))}
		</>
	);
};

export default PostSkeleton;
