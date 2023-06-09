export function getChunkArray<T>(initArray: T[], chunkSize: number): T[][] {
	let index = 0;
	const arrayLength = initArray.length;
	const chunksArray = [];

	// eslint-disable-next-line no-cond-assign
	for (index = 0, index < arrayLength; (index += chunkSize); ) {
		const chunk = initArray.slice(index, index + chunkSize);
		chunksArray.push(chunk);
	}

	return chunksArray;
}
