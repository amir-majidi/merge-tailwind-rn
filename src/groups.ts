// Helper: wrap each regex to allow prefixes like sm:, md:, hover:, focus:, dark:
const withPrefixes = (regex: RegExp): RegExp =>
  new RegExp(
    `^(sm:|md:|lg:|xl:|2xl:|hover:|focus:|active:|disabled:|dark:)?${regex.source}`
  );

const GROUPS: Record<string, RegExp[]> = {
  // Typography
  fontFamily: [
    withPrefixes(
      /^font-(?!thin|extralight|light|normal|medium|semibold|bold|extrabold|black).*$/
    ),
  ],
  fontWeight: [
    withPrefixes(
      /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/
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
  border: [withPrefixes(/^border(-(0|2|4|8))?$/)],
  borderT: [withPrefixes(/^border-t(-(0|2|4|8))?$/)],
  borderR: [withPrefixes(/^border-r(-(0|2|4|8))?$/)],
  borderB: [withPrefixes(/^border-b(-(0|2|4|8))?$/)],
  borderL: [withPrefixes(/^border-l(-(0|2|4|8))?$/)],
  borderX: [withPrefixes(/^border-x(-(0|2|4|8))?$/)],
  borderY: [withPrefixes(/^border-y(-(0|2|4|8))?$/)],

  borderColor: [
    withPrefixes(/^border-(black|white|transparent|[a-z]+-\d{1,4})$/),
  ],
  borderStyle: [withPrefixes(/^border-(solid|dashed|dotted|double|none)$/)],
  borderRadius: [withPrefixes(/^rounded(-(sm|md|lg|xl|2xl|3xl|full))?$/)],

  // Spacing (Padding)
  p: [withPrefixes(/^p-(-?\d+|px)$/)],
  px: [withPrefixes(/^px-(-?\d+|px)$/)],
  py: [withPrefixes(/^py-(-?\d+|px)$/)],
  pt: [withPrefixes(/^pt-(-?\d+|px)$/)],
  pr: [withPrefixes(/^pr-(-?\d+|px)$/)],
  pb: [withPrefixes(/^pb-(-?\d+|px)$/)],
  pl: [withPrefixes(/^pl-(-?\d+|px)$/)],

  // Spacing (Margin)
  m: [withPrefixes(/^m-(-?\d+|px|auto)$/)],
  mx: [withPrefixes(/^mx-(-?\d+|px|auto)$/)],
  my: [withPrefixes(/^my-(-?\d+|px|auto)$/)],
  mt: [withPrefixes(/^mt-(-?\d+|px|auto)$/)],
  mr: [withPrefixes(/^mr-(-?\d+|px|auto)$/)],
  mb: [withPrefixes(/^mb-(-?\d+|px|auto)$/)],
  ml: [withPrefixes(/^ml-(-?\d+|px|auto)$/)],

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
  width: [withPrefixes(/^w-(\d+|px|full|screen|auto|min|max|fit)$/)],
  height: [withPrefixes(/^h-(\d+|px|full|screen|auto|min|max|fit)$/)],
  minWidth: [withPrefixes(/^min-w-(\d+)$/)],
  minHeight: [withPrefixes(/^min-h-(\d+)$/)],
  maxWidth: [withPrefixes(/^max-w-(\d+)$/)],
  maxHeight: [withPrefixes(/^max-h-(\d+)$/)],

  // Effects
  shadow: [withPrefixes(/^shadow(-(sm|md|lg|xl|2xl|inner|none))?$/)],
  opacity: [withPrefixes(/^opacity-(\d{1,3})$/)],

  // Positioning
  position: [withPrefixes(/^(static|fixed|absolute|relative|sticky)$/)],
  inset: [withPrefixes(/^inset-(-?\d+|px|auto)$/)],
  insetX: [withPrefixes(/^inset-x-(-?\d+|px|auto)$/)],
  insetY: [withPrefixes(/^inset-y-(-?\d+|px|auto)$/)],
  top: [withPrefixes(/^top-(-?\d+|px|auto)$/)],
  right: [withPrefixes(/^right-(-?\d+|px|auto)$/)],
  bottom: [withPrefixes(/^bottom-(-?\d+|px|auto)$/)],
  left: [withPrefixes(/^left-(-?\d+|px|auto)$/)],
  zIndex: [withPrefixes(/^z-(\d+|auto)$/)],

  // Overflow
  overflow: [withPrefixes(/^overflow-(auto|hidden|visible|scroll)$/)],
  truncate: [withPrefixes(/^(truncate|text-ellipsis|text-clip)$/)],

  // Transforms
  scale: [withPrefixes(/^-?scale(-(x|y))?-(\d+)$/)], 
  rotate: [withPrefixes(/^rotate-(-?\d+)$/)],
  translate: [withPrefixes(/^-?translate-(x|y)-(-?\d+)$/)],
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
