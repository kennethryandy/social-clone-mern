import useSWR from 'swr'
import axios from '../utils/axiosConfig';

const fetcher = (...args) => axios.get(args).then(res => res.data);
const devOptions = { shouldRetryOnError: true, revalidateOnFocus: true, revalidateOnMount: true };

const useFecthData = (url) => {
	const { data, error } = useSWR(url, fetcher, devOptions);

	return {
		data,
		loading: !data,
		error
	}
}

export default useFecthData