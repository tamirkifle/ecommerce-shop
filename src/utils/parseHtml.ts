import DOMPurify from "dompurify";
import parse from "html-react-parser";

const parseHtml = (html: string) => {
  const clean = DOMPurify.sanitize(html, { USE_PROFILES: { html: true } });
  return parse(clean);
};

export default parseHtml;
