"use client";
import { useCallback, useState } from "react";

interface CompositeConfig {
	overlayWidthFactor?: number;
}

/**
 * A custom hook that composes images using a border image as background and one or more overlay images.
 */
export function useCanvasComposite() {
	const [downloadUrls, setDownloadUrls] = useState<string[]>([]);

	const loadImage = (src: string): Promise<HTMLImageElement> =>
		new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.src = src;
			img.onload = () => resolve(img);
			img.onerror = (err) => reject(err);
		});

	/**
	 * Composites multiple overlay images on top of a border image.
	 *
	 * @param borderUrl - URL for the border (background) image.
	 * @param overlayUrls - Array of overlay image URLs.
	 * @param config - Optional configuration for sizing.
	 * @returns A promise that resolves with an array of data URLs representing the composite images.
	 */

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	const exportImages = useCallback(
		async (
			borderUrl: string,
			overlayUrls: string[],
			config: CompositeConfig = {},
		): Promise<string[]> => {
			const { overlayWidthFactor = 0.8 } = config;

			try {
				const borderImg = await loadImage(borderUrl);

				const compositePromises = overlayUrls.map(async (overlayUrl) => {
					const overlayImg = await loadImage(overlayUrl);

					const canvas = document.createElement("canvas");
					canvas.width = borderImg.width;
					canvas.height = borderImg.height;
					const ctx = canvas.getContext("2d");
					if (!ctx) {
						throw new Error("Could not get canvas context");
					}

					ctx.drawImage(borderImg, 0, 0);

					const overlayWidth = borderImg.width * overlayWidthFactor;
					const overlayHeight =
						(overlayImg.naturalHeight * overlayWidth) / overlayImg.naturalWidth;

					const offsetX = (borderImg.width - overlayWidth) / 2;
					const offsetY = (borderImg.height - overlayHeight) / 2;

					ctx.drawImage(
						overlayImg,
						offsetX,
						offsetY,
						overlayWidth,
						overlayHeight,
					);

					return canvas.toDataURL("image/png");
				});

				const results = await Promise.all(compositePromises);
				setDownloadUrls(results);
				return results;
			} catch (error) {
				console.error("Error creating composite images:", error);
				throw error;
			}
		},
		[],
	);

	return { exportImages, downloadUrls };
}
