import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { getCroppedImg } from "@/helpers/image-crop";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import * as React from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import type { DropzoneFileListContext } from "./drop-zone";

export function CropDialog({
	trigger,
	file,
	context,
}: {
	trigger: React.ReactNode;
	file: string;
	context: DropzoneFileListContext<unknown, unknown>;
}) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [crop, setCrop] = React.useState<Crop>();
	const imageRef = React.useRef<HTMLImageElement>(null);

	const handleCrop = async () => {
		if (imageRef.current && crop?.width && crop?.height) {
			try {
				const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
				context.fileStatus.result = croppedImageUrl;
				context.fileStatus.status = "success";
				setOpen(false);
			} catch (error) {
				console.error("Crop failed:", error);
			}
		}
	};

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={setOpen}>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent className="sm:max-w-[725px] sm:max-h-screen">
					<DialogHeader>
						<DialogTitle>Foto bijsnijden</DialogTitle>
						<DialogDescription>
							Selecteer het gebied dat je wilt behouden. Klik op toepassen
							wanneer je klaar bent.
						</DialogDescription>
					</DialogHeader>
					<CropItem
						file={file}
						crop={crop}
						setCrop={setCrop}
						imageRef={imageRef as React.RefObject<HTMLImageElement>}
					/>
					<DialogFooter>
						<Button onClick={handleCrop}>Bijsnijden</Button>
						<DialogClose asChild>
							<Button variant="outline">Annuleer</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>{trigger}</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Foto bijsnijden</DrawerTitle>
					<DrawerDescription>
						Selecteer het gebied dat je wilt behouden. Klik op toepassen wanneer
						je klaar bent.
					</DrawerDescription>
				</DrawerHeader>
				<CropItem
					className="px-4"
					file={file}
					crop={crop}
					setCrop={setCrop}
					imageRef={imageRef as React.RefObject<HTMLImageElement>}
				/>
				<DrawerFooter className="pt-2">
					<Button onClick={handleCrop}>Bijsnijden</Button>
					<DrawerClose asChild>
						<Button variant="outline">Annuleer</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

interface CropItemProps extends React.ComponentProps<"div"> {
	file: string;
	crop: Crop | undefined;
	setCrop: (c: Crop) => void;
	imageRef: React.RefObject<HTMLImageElement>;
}

function CropItem({ className, file, crop, setCrop, imageRef }: CropItemProps) {
	return (
		<div
			className={cn("flex items-center overflow-auto max-h-[80vh]", className)}
		>
			<ReactCrop aspect={4 / 5} crop={crop} onChange={(c) => setCrop(c)}>
				<img
					ref={imageRef}
					src={file}
					alt="item to crop"
					className="max-w-full max-h-[80vh] object-contain"
				/>
			</ReactCrop>
		</div>
	);
}
