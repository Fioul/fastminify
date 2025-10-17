// Beautify functions for different languages
import * as beautify from 'js-beautify'

export interface BeautifyOptions {
  indentSize: number
  indentChar: 'space' | 'tab'
  maxLineLength: number
  preserveNewlines: boolean
}

export const defaultBeautifyOptions: BeautifyOptions = {
  indentSize: 2,
  indentChar: 'space',
  maxLineLength: 80,
  preserveNewlines: true
}

/**
 * Beautify JavaScript code using js-beautify library
 */
export function beautifyJavaScript(code: string, options: BeautifyOptions = defaultBeautifyOptions): string {
  try {
    const indentChar = options.indentChar === 'tab' ? '\t' : ' '
    const indentSize = options.indentChar === 'tab' ? 1 : options.indentSize
    
    const beautifyOptions: beautify.JSBeautifyOptions = {
      indent_size: indentSize,
      indent_char: indentChar,
      max_preserve_newlines: options.preserveNewlines ? 2 : 0,
      preserve_newlines: options.preserveNewlines,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal',
      brace_style: 'collapse',
      space_before_conditional: true,
      unindent_chained_methods: false,
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
      jslint_happy: false,
      keep_array_indentation: false,
      keep_function_indentation: false,
      space_after_anon_function: false,
      space_after_named_function: false,
      space_before_conditional: true,
      space_in_empty_parens: false,
      space_in_paren: false,
      unescape_strings: false,
      wrap_line_length: options.maxLineLength,
      end_with_newline: true,
      eol: '\n'
    }
    
    return beautify.js(code, beautifyOptions)
  } catch (error) {
    console.error('JavaScript beautification error:', error)
    return code
  }
}

/**
 * Beautify CSS code using js-beautify library
 */
export function beautifyCSS(code: string, options: BeautifyOptions = defaultBeautifyOptions): string {
  try {
    const indentChar = options.indentChar === 'tab' ? '\t' : ' '
    const indentSize = options.indentChar === 'tab' ? 1 : options.indentSize
    
    const beautifyOptions: beautify.CSSBeautifyOptions = {
      indent_size: indentSize,
      indent_char: indentChar,
      max_preserve_newlines: options.preserveNewlines ? 2 : 0,
      preserve_newlines: options.preserveNewlines,
      keep_array_indentation: false,
      break_chained_methods: false,
      indent_scripts: 'normal',
      brace_style: 'collapse',
      space_before_conditional: true,
      unindent_chained_methods: false,
      indent_inner_html: false,
      comma_first: false,
      e4x: false,
      indent_empty_lines: false,
      jslint_happy: false,
      selector_separator_newline: true,
      newline_between_rules: true,
      space_around_combinator: true,
      end_with_newline: true,
      eol: '\n'
    }
    
    return beautify.css(code, beautifyOptions)
  } catch (error) {
    console.error('CSS beautification error:', error)
    return code
  }
}

/**
 * Beautify JSON code
 */
export function beautifyJSON(code: string, options: BeautifyOptions = defaultBeautifyOptions): string {
  try {
    // Parse and stringify with proper indentation
    const parsed = JSON.parse(code)
    const indent = options.indentChar === 'tab' ? '\t' : ' '.repeat(options.indentSize)
    return JSON.stringify(parsed, null, indent)
  } catch (error) {
    console.error('JSON beautification error:', error)
    return code
  }
}

/**
 * Main beautify function that routes to the appropriate beautifier
 */
export function beautifyCode(code: string, language: 'js' | 'css' | 'json', options: BeautifyOptions = defaultBeautifyOptions): string {
  switch (language) {
    case 'js':
      return beautifyJavaScript(code, options)
    case 'css':
      return beautifyCSS(code, options)
    case 'json':
      return beautifyJSON(code, options)
    default:
      return code
  }
}