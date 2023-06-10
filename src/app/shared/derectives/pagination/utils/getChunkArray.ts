export function getChunkArray<T>(initArray: T[], chunkSize: number): T[][] {
	let index = 0;
	const chunksArray = [];

	// eslint-disable-next-line no-cond-assign
	for (index = 0; index < initArray.length; index += chunkSize) {
		const chunk = initArray.slice(index, index + chunkSize);
		chunksArray.push(chunk);
	}
	return chunksArray;
}
