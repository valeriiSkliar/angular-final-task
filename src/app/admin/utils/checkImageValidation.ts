export function checkImageValidation(value: string): Promise<boolean> {
	return new Promise((resolve, reject) => {
		const validImage = new Image();

		validImage.onload = () => resolve(true);
		validImage.onerror = () => reject(true);
		validImage.src = value;
	});
}
