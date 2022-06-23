import { useRef, useEffect, memo } from 'react'
import useTheme from '@mui/material/styles/useTheme';
import data from '@emoji-mart/data'
import { Picker } from 'emoji-mart'
import { StyledEmojiWrapper } from './Styled';

const EmojiPicker = (props) => {
	const ref = useRef();
	const theme = useTheme();

	useEffect(() => {
		if (ref.current.children.length === 0) {
			new Picker({ ...props, theme: theme.palette.mode, data, ref });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [theme])

	return <StyledEmojiWrapper ref={ref} />
}

export default memo(EmojiPicker);