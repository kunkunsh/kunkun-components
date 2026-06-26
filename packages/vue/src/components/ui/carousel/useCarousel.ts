import type { UnwrapRefCarouselApi as CarouselApi, CarouselEmits, CarouselProps } from "./interface"
import { createInjectionState } from "@vueuse/core"
import emblaCarouselVue from "embla-carousel-vue"
import { onMounted, ref, type Ref } from "vue"

interface CarouselState {
  carouselRef: Ref<HTMLElement | undefined>
  carouselApi: Ref<CarouselApi>
  canScrollPrev: Ref<boolean>
  canScrollNext: Ref<boolean>
  scrollPrev: () => void
  scrollNext: () => void
  orientation: CarouselProps["orientation"]
}

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({
    opts,
    orientation,
    plugins,
  }: CarouselProps, emits: CarouselEmits): CarouselState => {
    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y",
    }, plugins)

    function scrollPrev() {
      emblaApi.value?.scrollPrev()
    }
    function scrollNext() {
      emblaApi.value?.scrollNext()
    }

    const canScrollNext = ref(false)
    const canScrollPrev = ref(false)

    function onSelect(api: CarouselApi) {
      canScrollNext.value = api?.canScrollNext() || false
      canScrollPrev.value = api?.canScrollPrev() || false
    }

    onMounted(() => {
      if (!emblaApi.value)
        return

      emblaApi.value?.on("init", onSelect)
      emblaApi.value?.on("reInit", onSelect)
      emblaApi.value?.on("select", onSelect)

      emits("init-api", emblaApi.value)
    })

    return { carouselRef: emblaNode, carouselApi: emblaApi, canScrollPrev, canScrollNext, scrollPrev, scrollNext, orientation } satisfies CarouselState
  },
)

function useCarousel() {
  const carouselState = useInjectCarousel()

  if (!carouselState)
    throw new Error("useCarousel must be used within a <Carousel />")

  return carouselState
}

export { useCarousel, useProvideCarousel }
