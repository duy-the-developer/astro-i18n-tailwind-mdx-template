import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'
import type { Locale } from '@/config/i18n-config'

export function LanguageSwitcher({
  currentLocale,
  languages,
}: {
  currentLocale: Locale
  languages: Record<Locale, string>
}) {
  return (
    <div aria-label="Language" className="text-sm/6 font-semibold">
      <div className="hidden lg:block">
        <Popover>
          <PopoverTrigger className="group flex items-center gap-x-1 capitalize">
            {currentLocale}
            <ChevronDownIcon className="h-5 w-5 transition-transform group-[&[data-state=open]]:rotate-180" />
          </PopoverTrigger>
          <PopoverContent className="flex w-fit flex-col gap-y-2 bg-white px-2 capitalize">
            {Object.keys(languages).map((l) => {
              return (
                <a
                  key={l}
                  href={languages[l as keyof typeof languages]}
                  className="hover:bg-brand-grey-200 pr-8 pl-2"
                >
                  {l}
                </a>
              )
            })}
          </PopoverContent>
        </Popover>
      </div>

      {/* Mobile version: */}
      <div className="flex gap-x-8 py-5 lg:hidden">
        {Object.keys(languages).map((l) => {
          return (
            <a
              key={l}
              href={languages[l as keyof typeof languages]}
              className={cn('capitalize', l === currentLocale && 'underline')}
            >
              {l}
            </a>
          )
        })}
      </div>
    </div>
  )
}
