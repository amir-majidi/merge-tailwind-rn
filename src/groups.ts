// Helper: wrap each regex to allow prefixes like sm:, md:, hover:, focus:, dark:
const withPrefixes = (regex: RegExp): RegExp =>
  new RegExp(
    `^(sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|disabled:|dark:)?${regex.source}`
  );

const fractionPattern = "(\\d+\\/\\d+)"; // e.g. 3/5
const valuePattern = "(\\d+|px|full|screen|auto|min|max|fit|\\[.*\\])"; // extended pattern
const spacingValue = "(-?\\d+|px|auto|\\[(.+?)\\])";
const borderWidthValue = "(0|2|4|8|\\[(.+?)\\])";
const transformValue = "(-?\\d+|\\[(.+?)\\])";
const insetValue = "(-?\\d+|px|auto|\\[(.+?)\\])";

const GROUPS: Record<string, RegExp[]> = {
  // Typography
  fontFamily: [
    withPrefixes(
      /^font-(?!thin|extralight|light|normal|medium|semibold|bold|extrabold|black).*$/ // font-inter, font-sans, etc.
    ),
  ],
  fontWeight: [
    withPrefixes(
      /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/ // font-bold
    ),
  ],
  textSize: [withPrefixes(/^text-(xs|sm|base|lg|xl|\d+xl)$/)],
  textColor: [withPrefixes(/^text-(black|white|transparent|[a-z]+-\d{1,4})$/)],
  textAlign: [withPrefixes(/^text-(left|right|center|justify)$/)],
  leading: [
    withPrefixes(/^leading-(none|tight|snug|normal|relaxed|loose|\d+)$/),
  ],
  tracking: [
    withPrefixes(/^tracking-(tighter|tight|normal|wide|wider|widest)$/),
  ],

  // Background
  bgColor: [withPrefixes(/^bg-(black|white|transparent|[a-z]+-\d{1,4})$/)],
  bgOpacity: [withPrefixes(/^bg-opacity-(\d{1,3})$/)],

  // Borders
  border: [withPrefixes(new RegExp(`^border(-${borderWidthValue})?$`))],
  borderT: [withPrefixes(new RegExp(`^border-t(-${borderWidthValue})?$`))],
  borderR: [withPrefixes(new RegExp(`^border-r(-${borderWidthValue})?$`))],
  borderB: [withPrefixes(new RegExp(`^border-b(-${borderWidthValue})?$`))],
  borderL: [withPrefixes(new RegExp(`^border-l(-${borderWidthValue})?$`))],
  borderX: [withPrefixes(new RegExp(`^border-x(-${borderWidthValue})?$`))],
  borderY: [withPrefixes(new RegExp(`^border-y(-${borderWidthValue})?$`))],

  borderColor: [
    withPrefixes(/^border-(black|white|transparent|[a-z]+-\d{1,4})$/),
  ],
  borderStyle: [withPrefixes(/^border-(solid|dashed|dotted|double|none)$/)],
  borderRadius: [
    withPrefixes(
      /^rounded(-(sm|md|lg|xl|2xl|3xl|full)|-\[(.+?)\]|-(t|r|b|l|tl|tr|br|bl)|-(t|r|b|l|tl|tr|br|bl)-\[(.+?)\])?$/
    ),
  ],

  // Spacing (Padding)
  p: [withPrefixes(new RegExp(`^p-${spacingValue}$`))],
  px: [withPrefixes(new RegExp(`^px-${spacingValue}$`))],
  py: [withPrefixes(new RegExp(`^py-${spacingValue}$`))],
  pt: [withPrefixes(new RegExp(`^pt-${spacingValue}$`))],
  pr: [withPrefixes(new RegExp(`^pr-${spacingValue}$`))],
  pb: [withPrefixes(new RegExp(`^pb-${spacingValue}$`))],
  pl: [withPrefixes(new RegExp(`^pl-${spacingValue}$`))],

  // Spacing (Margin)
  m: [withPrefixes(new RegExp(`^m-${spacingValue}$`))],
  mx: [withPrefixes(new RegExp(`^mx-${spacingValue}$`))],
  my: [withPrefixes(new RegExp(`^my-${spacingValue}$`))],
  mt: [withPrefixes(new RegExp(`^mt-${spacingValue}$`))],
  mr: [withPrefixes(new RegExp(`^mr-${spacingValue}$`))],
  mb: [withPrefixes(new RegExp(`^mb-${spacingValue}$`))],
  ml: [withPrefixes(new RegExp(`^ml-${spacingValue}$`))],

  // Gap & Space
  gap: [withPrefixes(/^gap-(\d+)$/)],
  gapX: [withPrefixes(/^gap-x-(\d+)$/)],
  gapY: [withPrefixes(/^gap-y-(\d+)$/)],
  space: [withPrefixes(/^space-(x|y)-(\d+)$/)],

  // Layout & Flex/Grid
  display: [withPrefixes(/^(flex|grid|hidden|block|inline-block)$/)],
  flex: [withPrefixes(/^flex(-(row|col|wrap|nowrap|1|auto|initial|none))?$/)],
  justify: [withPrefixes(/^justify-(start|end|center|between|around|evenly)$/)],
  items: [withPrefixes(/^items-(start|end|center|stretch|baseline)$/)],
  content: [withPrefixes(/^content-(start|end|center|between|around|evenly)$/)],
  self: [withPrefixes(/^self-(auto|start|end|center|stretch)$/)],
  grid: [withPrefixes(/^grid(-(cols|rows)-\d+)$/)],
  order: [withPrefixes(/^order-(\d+)$/)],

  // Sizing
  width: [withPrefixes(new RegExp(`^w-(${fractionPattern}|${valuePattern})$`))],
  height: [
    withPrefixes(new RegExp(`^h-(${fractionPattern}|${valuePattern})$`)),
  ],
  minWidth: [withPrefixes(/^min-w-((\d+|px|full|screen|\[.*\]))$/)],
  minHeight: [withPrefixes(/^min-h-((\d+|px|full|screen|\[.*\]))$/)],
  maxWidth: [withPrefixes(/^max-w-((\d+|px|full|screen|\[.*\]))$/)],
  maxHeight: [withPrefixes(/^max-h-((\d+|px|full|screen|\[.*\]))$/)],

  // Effects
  shadow: [withPrefixes(/^shadow(-(sm|md|lg|xl|2xl|inner|none))?$/)],
  opacity: [withPrefixes(/^opacity-(\d{1,3})$/)],

  // Positioning
  position: [withPrefixes(/^(static|fixed|absolute|relative|sticky)$/)],
  inset: [withPrefixes(new RegExp(`^inset-${insetValue}$`))],
  insetX: [withPrefixes(new RegExp(`^inset-x-${insetValue}$`))],
  insetY: [withPrefixes(new RegExp(`^inset-y-${insetValue}$`))],
  top: [withPrefixes(new RegExp(`^top-${insetValue}$`))],
  right: [withPrefixes(new RegExp(`^right-${insetValue}$`))],
  bottom: [withPrefixes(new RegExp(`^bottom-${insetValue}$`))],
  left: [withPrefixes(new RegExp(`^left-${insetValue}$`))],
  zIndex: [withPrefixes(/^z-(\d+|auto)$/)],

  // Overflow
  overflow: [withPrefixes(/^overflow-(auto|hidden|visible|scroll)$/)],
  truncate: [withPrefixes(/^(truncate|text-ellipsis|text-clip)$/)],

  // Transforms
  scale: [withPrefixes(/^-?scale(-(x|y))?-(\d+)$/)],
  rotate: [withPrefixes(/^rotate-(-?\d+)$/)],
  translate: [
    withPrefixes(new RegExp(`^-?translate-(x|y)-${transformValue}$`)),
  ],
  skew: [withPrefixes(/^-?skew-(x|y)-(-?\d+)$/)],
  transform: [withPrefixes(/^transform$/)],

  // Transitions
  transition: [
    withPrefixes(/^transition(-(none|all|colors|opacity|shadow|transform))?$/),
  ],
  duration: [withPrefixes(/^duration-(\d+)$/)],
  ease: [withPrefixes(/^ease-(linear|in|out|in-out)$/)],
  delay: [withPrefixes(/^delay-(\d+)$/)],

  // Animations
  animate: [withPrefixes(/^animate-(spin|ping|pulse|bounce|none)$/)],

  // Filters
  blur: [withPrefixes(/^blur(-(sm|md|lg|xl|2xl|3xl))?$/)],
  brightness: [withPrefixes(/^brightness-(\d+)$/)],
  contrast: [withPrefixes(/^contrast-(\d+)$/)],
  grayscale: [withPrefixes(/^grayscale$/)],
  invert: [withPrefixes(/^invert$/)],
  sepia: [withPrefixes(/^sepia$/)],
  saturate: [withPrefixes(/^saturate-(\d+)$/)],
  hueRotate: [withPrefixes(/^hue-rotate-(-?\d+)$/)],
};

export default GROUPS;
