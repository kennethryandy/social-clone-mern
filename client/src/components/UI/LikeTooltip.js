import Tooltip from '@mui/material/Tooltip';
import { TooltipList } from './Styled';

const LikeTooltip = ({ children, likes, userId }) => {

	const likesList = (
		<TooltipList>
			{likes.map(like => <li key={like?.creator?._id}>{like?.creator?._id === userId ? "You" : like?.creator?.fullname}</li>)}
		</TooltipList>
	);

	return (
		<Tooltip title={likes.length > 0 ? likesList : ""} placement="top" >
			{children}
		</Tooltip >
	)
}

export default LikeTooltip