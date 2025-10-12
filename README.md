# merge-tailwind-rn

[![KOFiMD7.md.png](https://iili.io/KOFiMD7.md.png)](https://freeimage.host/i/KOFiMD7)


Merge Tailwind-style classes for **React Native** + **NativeWind**, inspired by `twmerge`.  
Supports responsive variants (`sm:`, `md:`, …) and pseudo-classes (`hover:`, `focus:`, …).  
External classes always override internal classes (like `!important`).

---

## Installation

```bash
npm install merge-tailwind-rn
# or
yarn add merge-tailwind-rn
```

---

## Usage

```tsx
import { cva } from "class-variance-authority";
import mergeTailwindRN from "merge-tailwind-rn";

const baseInputContainer = cva(
  "p-3 flex-row-reverse items-center font-yekanRegular",
  {
    variants: {
      variant: {
        outline: "border border-gray-400 rounded-lg",
        underline: "border-b border-gray-400",
      },
      focused: {
        true: "border-primary-400",
        false: "",
      },
    },
    defaultVariants: {
      variant: "outline",
      focused: false,
    },
  }
);

<View
  className={mergeTailwindRN(
    baseInputContainer({ variant, focused }),
    className
  )}
>
  <TextInput
    className={mergeTailwindRN(
      "flex-1 h-6 p-0 text-right font-yekanRegular text-sm",
      textClassName
    )}
    {...props}
  />
</View>;
```

---

## Features

- Automatic merge of Tailwind classes for React Native
- Responsive and pseudo-class aware
- External classes override internal ones
- Fully compatible with NativeWind and cva
- TypeScript-ready with autocomplete

---

## Author

Amir Majidinia

---

## License

MIT
