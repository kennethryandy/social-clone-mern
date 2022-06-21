import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const PostSkeleton = () => {
	return (
		<>
			<Paper elevation={3} sx={{ marginBottom: 3, padding: 2 }}>
				<Stack spacing={1}>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Skeleton variant="circular" width={40} height={40} />
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
					<Skeleton variant="rectangular" width={200} height={20} />
					<Skeleton variant="rectangular" width={400} height={20} />
				</Stack>
			</Paper>
			<Paper elevation={3} sx={{ marginBottom: 3, padding: 2 }}>
				<Stack spacing={1}>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Skeleton variant="circular" width={40} height={40} />
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
					<Skeleton variant="rectangular" width={200} height={20} />
					<Skeleton variant="rectangular" width={400} height={20} />
				</Stack>
			</Paper>
			<Paper elevation={3} sx={{ marginBottom: 3, padding: 2 }}>
				<Stack spacing={1}>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Skeleton variant="circular" width={40} height={40} />
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
					<Skeleton variant="rectangular" width={200} height={20} />
					<Skeleton variant="rectangular" width={400} height={20} />
				</Stack>
			</Paper>
			<Paper elevation={3} sx={{ marginBottom: 3, padding: 2 }}>
				<Stack spacing={1}>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Skeleton variant="circular" width={40} height={40} />
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
					<Skeleton variant="rectangular" width={200} height={20} />
					<Skeleton variant="rectangular" width={400} height={20} />
				</Stack>
			</Paper>
			<Paper elevation={3} sx={{ marginBottom: 3, padding: 2 }}>
				<Stack spacing={1}>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Skeleton variant="circular" width={40} height={40} />
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
					<Skeleton variant="rectangular" width={200} height={20} />
					<Skeleton variant="rectangular" width={400} height={20} />
				</Stack>
			</Paper>
		</>
	);
};

export default PostSkeleton;
