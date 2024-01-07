import { Rating, RatingProps } from '@smastrom/react-rating'
import { Text } from './Label/Text'

type GradeRatingProps = RatingProps & {
  prepend?: string
  append?: string
  scoreTimes?: number
  showScore?: boolean
}

export const GradeRating = ({
  append,
  prepend,
  value,
  onChange,
  scoreTimes = 1,
  showScore = true,
  ...props
}: GradeRatingProps) => {
  return (
    <div className="flex flex-col w-36" aria-label="grade">
      <Rating value={value} onChange={onChange} {...props} />
      {showScore && (
        <Text
          size="xs"
          className="self-end text-foreground-500 pr-0.5"
          format={{
            text: String(value * scoreTimes),
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
      )}
    </div>
  )
}
