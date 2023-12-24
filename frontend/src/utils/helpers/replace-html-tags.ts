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
 * @example .refine((v) => max(v, 10))
 */
export const max = (text: string, value: number) => {
  return ct(text).length <= value
}

/**
 * Shows 'required' error message if the text is empty. It will be used
 * in zod schema validation.
 */
export const required = () => {
  return { params: { i18n: { key: 'required' } } }
}

/**
 * Shows 'message' error message if the text is empty. It will be used
 * in zod schema validation.
 */
export const message = (key: string, value?: string | number) => {
  return { params: { i18n: { key, values: { value } } } }
}
