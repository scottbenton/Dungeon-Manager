export function getInitials(displayName?: string): string | undefined {
  if (!displayName) return undefined;

  const splitName = displayName.split(' ');
  if (splitName.length > 1) {
    return splitName[0][0] + splitName[splitName.length - 1][0];
  }
  return splitName[0][0];
}
