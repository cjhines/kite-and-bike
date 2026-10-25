import type { useTranslations } from 'next-intl';

type Namespace = NonNullable<Parameters<typeof useTranslations>[0]>;

// The `t` from useTranslations(namespace), e.g. Translator<'Tours'>. Lets the _data helpers take a
// page's `t` without calling the hook themselves.
export type Translator<N extends Namespace> = ReturnType<typeof useTranslations<N>>;

// The activity or tour shown in BookingModal. `name` is what Rashid receives as the booking's tour.
export interface BookingActivity {
  name: string;
  price: string;
  duration?: string;
}
