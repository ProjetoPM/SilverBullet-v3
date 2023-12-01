import { Rating, RatingProps } from '@smastrom/react-rating'
import { Text } from './label/Text'

type GradeRatingProps = RatingProps & {
  prepend?: string
  append?: string
}

export const GradeRating = ({
  append,
  prepend,
  value,
  onChange,
  ...props
}: GradeRatingProps) => {
  return (
    <div className="flex flex-col" aria-label="grade">
      <Rating className="w-36" value={value} onChange={onChange} {...props} />
      <Text
        size="xs"
        className="self-end text-foreground-500 pr-0.5"
        format={{
          text: String(value),
          as: 'number',
          options: {
            number: {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }
          }
        }}
        append={append}
        prepend={prepend}
      />
    </div>
  )
}
