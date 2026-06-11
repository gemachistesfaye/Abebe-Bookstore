declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';

  type IconProps = SVGProps<SVGSVGElement> & {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    absoluteStrokeWidth?: boolean;
  };

  type Icon = FC<IconProps>;

  export const BookOpen: Icon;
  export const Menu: Icon;
  export const X: Icon;
  export const Star: Icon;
  export const Search: Icon;
  export const Heart: Icon;
  export const Eye: Icon;
  export const Filter: Icon;
  export const Languages: Icon;
  export const ArrowLeft: Icon;
  export const ShieldCheck: Icon;
  export const Info: Icon;
  export const Phone: Icon;
  export const Mail: Icon;
  export const Send: Icon;
  export const MapPin: Icon;
  export const MessageCircle: Icon;
  export const Award: Icon;
  export const Users: Icon;
  export const Coffee: Icon;
  export const Scroll: Icon;
  export const Map: Icon;
  export const Plus: Icon;
  export const Minus: Icon;
  export const Trash2: Icon;
  export const ShoppingBag: Icon;
  export const ShoppingCart: Icon;
  export const Moon: Icon;
  export const Sun: Icon;
  export const Check: Icon;
  export const ArrowUpDown: Icon;
  export const ToggleLeft: Icon;
  export const ToggleRight: Icon;
}
