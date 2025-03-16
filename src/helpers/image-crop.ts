import type { Crop } from "react-image-crop";

export async function getCroppedImg(
	image: HTMLImageElement,
	crop: Crop,
): Promise<string> {
	const canvas = document.createElement("canvas");
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;
	canvas.width = crop.width * scaleX;
	canvas.height = crop.height * scaleY;
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("2D context not available");
	}

	ctx.drawImage(
		image,
		crop.x * scaleX,
		crop.y * scaleY,
		crop.width * scaleX,
		crop.height * scaleY,
		0,
		0,
		crop.width * scaleX,
		crop.height * scaleY,
	);

	return new Promise((resolve, reject) => {
		canvas.toBlob((blob) => {
			if (!blob) {
				reject(new Error("Canvas is empty"));
				return;
			}
			const url = URL.createObjectURL(blob);
			resolve(url);
		}, "image/jpeg");
	});
}
