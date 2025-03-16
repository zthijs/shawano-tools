"use client";

import { CloudUploadIcon, ScanIcon, Trash2Icon } from "lucide-react";
import type { FC } from "react";
import {
	DropZoneArea,
	Dropzone,
	DropzoneDescription,
	DropzoneFileList,
	DropzoneFileListItem,
	DropzoneMessage,
	DropzoneRemoveFile,
	DropzoneResizeFile,
	DropzoneTrigger,
	type UseDropzoneReturn,
} from "./ui/drop-zone";

export const DropZone: FC<{ dropzone: UseDropzoneReturn<string, string> }> = ({
	dropzone,
}) => {
	return (
		<div className="not-prose flex flex-col gap-4">
			<Dropzone {...dropzone}>
				<div>
					<div className="flex justify-between">
						<DropzoneDescription>
							Upload maximaal 10 afbeeldingen
						</DropzoneDescription>
						<DropzoneMessage />
					</div>
					<DropZoneArea>
						<DropzoneTrigger className="flex flex-col items-center gap-4 bg-transparent p-10 text-center text-sm">
							<CloudUploadIcon className="size-8" />
							<div>
								<p className="font-semibold">Upload hier je foto&apos;s</p>
								<p className="text-sm text-muted-foreground">
									Klik hier of sleep foto&apos;s op dit vlak
								</p>
							</div>
						</DropzoneTrigger>
					</DropZoneArea>
				</div>

				<DropzoneFileList className="grid grid-cols-2 md:grid-cols-4 gap-4 p-0">
					{dropzone.fileStatuses.map((file) => (
						<DropzoneFileListItem
							className="overflow-hidden rounded-md bg-secondary p-0 shadow-sm"
							key={file.id}
							file={file}
						>
							{file.status === "pending" && (
								<div className="aspect-video animate-pulse bg-black/20" />
							)}
							{file.status === "success" && (
								// eslint-disable-next-line @next/next/no-img-element
								<img
									src={file.result}
									alt={`uploaded-${file.fileName}`}
									className="aspect-video object-cover"
								/>
							)}
							<div className="flex items-center justify-between p-2 pl-4">
								<div className="min-w-0">
									<p className="truncate text-sm">{file.fileName}</p>
									<p className="text-xs text-muted-foreground">
										{(file.file.size / (1024 * 1024)).toFixed(2)} MB
									</p>
								</div>
								<div>
									<DropzoneResizeFile
										variant="ghost"
										className="shrink-0 hover:outline"
									>
										<ScanIcon className="size-4" />
									</DropzoneResizeFile>
									<DropzoneRemoveFile
										variant="ghost"
										className="shrink-0 hover:outline"
									>
										<Trash2Icon className="size-4" />
									</DropzoneRemoveFile>
								</div>
							</div>
						</DropzoneFileListItem>
					))}
				</DropzoneFileList>
			</Dropzone>
		</div>
	);
};
export { DropzoneRemoveFile };
