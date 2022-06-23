import { CommentWrapper, CommentMessage } from './CommentStyled';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

const Comment = ({ comment }) => {

	return (
		<CommentWrapper>
			<Avatar aria-label="profile-picture" src={comment.creator.img} component={Link} to={`/profile/${comment.creator._id}`} />
			<CommentMessage>
				<Typography variant="caption" component={Link} to={`/profile/${comment.creator._id}`} className="comment_creator">{comment.creator.fullname}</Typography>
				<Typography variant="body1">{comment.content}</Typography>
			</CommentMessage>
		</CommentWrapper>
	)
}

export default Comment