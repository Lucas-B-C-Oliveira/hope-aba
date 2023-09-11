export const TEXT_INPUT_CLASSNAME = `rounded-md border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`
export const DAY_CARD_CLASSNAME = `flex flex-col gap-1 p-2 relative h-fit rounded-md border-0 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`
export const CHECKBOX_INPUT_CLASSNAME = `rounded border-gray-300 text-indigo-600 focus:ring-indigo-600`
export const SELECT_INPUT_CLASSNAME = `rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-700 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`
export const TEXT_LABEL_OF_TEXT_INPUT_CLASSNAME = `block text-sm font-medium leading-6 text-gray-700`
export const BUTTON_CLASSNAME = `justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
export const MAGIC_LABEL_CLASSNAME = `absolute -top-[0.65rem] left-2 inline-block bg-white px-1 text-sm font-bold text-gray-600`
export const MAGIC_INPUT_CLASSNAME = `block w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`

export const MUI_INPUT_SX = {
  bgcolor: 'transparent',
  '& .MuiInputBase-input': {
    boxSizing: 'unset',
    height: 'fit-content',
    width: '100%',
    border: 'none',
    paddingTop: '0.6rem',
    paddingBottom: '0.6rem',
    color: '#111827',
    backgroundColor: '#ffffff',
    lineHeight: '0.5em',
    outline: 'none',
    fontSize: '0.875rem',
    margin: 0,
  },

  '& .MuiInputBase-input:focus': {
    outline: 'none',
    outlineOffset: '0px',
    '--tw-ring-inset': 'var(--tw-empty,/*!*/ /*!*/)',
    '--tw-ring-offset-width': '0px',
    '--tw-ring-offset-color': 'transparent',
    '--tw-ring-color': 'transparent',
    '--tw-ring-offset-shadow': 'none',
    '--tw-ring-shadow': 'none',
    boxShadow: 'none',
    borderColor: 'transparent',
  },

  '& .MuiInputBase-root': {
    border: 'none',
    outline: 'none',
    margin: 0,
    borderRadius: '0.375rem',
    borderColor: 'transparent',
    borderWidth: '0px',
    color: 'transparent',
  },
}
