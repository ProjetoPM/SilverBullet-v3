/**
 * Clear HTML tags from a string, by default replace by empty string
 *
 * @param text the text to clear
 * @param replaceBy the string to replace the tags
 * @returns the text without HTML tags
 */
export const ct = (text: string, replaceBy?: string) => {
  return text?.replace(/(<([^>]+)>)/gi, replaceBy || '')
}

/**
 * Check if the text has a minimum length. It will be used
 * in zod schema validation.
 *
 * @example .refine(min) // same as below
 * @example .refine((v) => min(v))
 * @example .refine((v) => min(v, 10))
 */
export const min = (text: string, value = 1) => {
  return ct(text).length >= value
}

/**
 * Check if the text has a minimum length. It will be used
 * in zod schema validation.
 *
 * @example .refine(max) // max is 1000 by default
 * @example .refine((v) => max(v, 10))
 */
export const max = (text: string, value = 1000) => {
  return ct(text).length <= value
}
