// declare module "*.css";
// declare module "*.less";
// declare module "*.scss";
// declare module "*.sass";
// declare module "*.svg";
// declare module "*.png";
// declare module "*.jpg";
// declare module "*.jpeg";
// declare module "*.gif";
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "markdown-it-highlight" {
  import MarkdownIt from "markdown-it";
  const highlight: (md: MarkdownIt) => void;
  export default highlight;
}
