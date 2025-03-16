"use client";

import { DropZone } from "@/components/drop-zone";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useDropzone } from "@/components/ui/drop-zone";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { frameImages } from "@/constants/frame-images";
import { useCanvasComposite } from "@/hooks/use-canvas-composite";
import { saveAs } from "file-saver";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { PostFramerUitleg } from "./uitleg";

export default function PostFramer() {
	const dropzone = useDropzone({
		onDropFile: async (file: File) => {
			return {
				status: "success",
				result: URL.createObjectURL(file),
			};
		},
		validation: {
			accept: {
				"image/*": [".png", ".jpg", ".jpeg"],
			},
			maxSize: 10 * 1024 * 1024,
			maxFiles: 10,
		},
	});

	const [selectedBorder, setSelectedBorder] = useState(frameImages[0].slug);

	const { exportImages, downloadUrls } = useCanvasComposite();

	const handleExport = async () => {
		const borderUrl = frameImages.find(
			(image) => image.slug === selectedBorder,
		)?.src;
		const overlayUrls = dropzone.fileStatuses.map(
			(fileStatus) => fileStatus.result,
		);

		if (!overlayUrls.every((url) => url !== undefined) || !borderUrl) return;

		try {
			await exportImages(borderUrl, overlayUrls);
		} catch (error) {
			alert("There was an error exporting the images.");
		}
	};

	return (
		<div className="flex flex-1 flex-col gap-4 p-4 pt-0">
			<Card>
				<CardHeader>
					<CardTitle>Post Framer</CardTitle>
					<CardDescription>
						Voeg een kader toe voor jouw social media posts.
					</CardDescription>
					<CardAction>
						<PostFramerUitleg />
					</CardAction>
				</CardHeader>
			</Card>
			<DropZone dropzone={dropzone} />
			<Separator />
			<p className="pb-1 text-sm text-muted-foreground">
				Selecteer een speltak
			</p>
			<RadioGroup
				onValueChange={setSelectedBorder}
				defaultValue="account"
				className="w-full grid grid-cols-2 md:grid-cols-4 gap-2"
			>
				{frameImages.map(({ slug, label }) => (
					<div className="flex items-center space-x-2" key={slug}>
						<RadioGroupItem value={slug} id={slug} />
						<Label htmlFor={slug}>{label}</Label>
					</div>
				))}
			</RadioGroup>
			<Separator />
			<p className="pb-1 text-sm text-muted-foreground">
				Genereer de afbeeldingen
			</p>
			<Button
				disabled={dropzone.fileStatuses.length < 1}
				onClick={handleExport}
			>
				Genereer
			</Button>
			{downloadUrls.length > 0 && (
				<div className="grid grid-cols-3 gap-4 md:grid-cols-5 lg:grid-cols-7">
					<PhotoProvider>
						{downloadUrls.map((url, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							<PhotoView key={`preview-${index}`} src={url}>
								<img
									src={url}
									alt={`Generated  ${index + 1}`}
									className="object-contain aspect-4/5  max-w-52 rounded-md"
								/>
							</PhotoView>
						))}
					</PhotoProvider>
				</div>
			)}

			<Separator />
			<p className="pb-1 text-sm text-muted-foreground">
				Download de afbeeldingen
			</p>
			<Button
				disabled={downloadUrls.length < 1}
				onClick={() => {
					downloadUrls.forEach((url, index) => {
						saveAs(url, `generated-${index + 1}.png`);
					});
				}}
			>
				Download
			</Button>
		</div>
	);
}
