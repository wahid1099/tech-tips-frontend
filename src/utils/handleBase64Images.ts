import base64ToLink from "./base64ToLink";

const handleBase64Images = async (htmlContent: string) => {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const promises = [];

  let match;

  while ((match = imgRegex.exec(htmlContent)) !== null) {
    const imgSrc = match[1];

    if (imgSrc.startsWith("data:image")) {
      promises.push(
        base64ToLink(imgSrc).then((url) => {
          if (url) {
            htmlContent = htmlContent.replace(imgSrc, url);
          }
        })
      );
    }
  }

  await Promise.all(promises);

  return htmlContent;
};

export default handleBase64Images;
