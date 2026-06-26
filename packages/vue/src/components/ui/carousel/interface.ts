import type useEmblaCarousel from "embla-carousel-vue"
import type { EmblaCarouselType } from "embla-carousel"
import type { HTMLAttributes } from "vue"

type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

export type UnwrapRefCarouselApi = EmblaCarouselType | undefined

export interface CarouselProps {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  orientation?: "horizontal" | "vertical"
}

export interface CarouselEmits {
  (e: "init-api", payload: UnwrapRefCarouselApi): void
}

export interface WithClassAsProps {
  class?: HTMLAttributes["class"]
}
