import { useEffect, useState } from 'react'

const getSavedValue = (key, initialValue) => {
	const savedValue = JSON.parse(localStorage.getItem(key));
	if (savedValue) return savedValue;

	if (savedValue instanceof Function) return initialValue();

	return initialValue;
};

export default function useLocalStorage (key, initialValue) {
	const [value, setValue] = useState(() => getSavedValue(key, initialValue));

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
}