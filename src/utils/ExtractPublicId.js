function extractPublicId(url) {
    const segments = url.split('/');
    const filenameWithExtension = segments[segments.length - 1];
    const filenameParts = filenameWithExtension.split('.');
    const uniqueIdentifier = filenameParts[0];
    return uniqueIdentifier;
}

export {extractPublicId}