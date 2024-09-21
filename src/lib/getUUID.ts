export function getUUID(): string {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${timestamp}_${randomNumber}`;
}

export function getRenamedFileWithUUIDName(file: File): File {
  const uuid = getUUID();
  const filename = file.name;
  const extension = filename.split('.').pop();
  const renamedFilename = `${uuid}.${extension}`;
  return new File([file], renamedFilename, { type: file.type });
}
