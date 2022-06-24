import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import PropTypes from 'prop-types';

const PostSkeleton = ({item, withImage}) => {
	
	return (
		<>
			{Array(item).fill(null).map((_,i) => (
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
						{withImage && (
							<Skeleton
							variant="rectangular"
							width="100%"
							height={280}
						/>
						)}
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

PostSkeleton.propTypes = {
	item: PropTypes.number,
	withImage: PropTypes.bool
}

PostSkeleton.defaultProps = {
	item: 1,
	withImage: false
}

export default PostSkeleton;
