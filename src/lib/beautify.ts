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
 * Beautify JSON code using JSON.stringify with proper indentation
 */
export function beautifyJSON(code: string, options: BeautifyOptions = defaultBeautifyOptions): string {
  try {
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid JSON code provided')
    }
    
    const indentChar = options.indentChar === 'tab' ? '\t' : ' '
    const indentSize = options.indentChar === 'tab' ? 1 : options.indentSize
    const indent = indentChar.repeat(indentSize)
    
    // Parse JSON to validate syntax
    const parsed = JSON.parse(code)
    
    // Stringify with proper indentation
    return JSON.stringify(parsed, null, indent)
  } catch (error) {
    console.error('JSON beautification error:', error)
    return code
  }
}

/**
 * Beautify PHP serialized data by converting to JSON and beautifying
 * This function unserializes PHP data, converts to JSON, and beautifies it
 */
export function beautifyPHP(code: string, options: BeautifyOptions = defaultBeautifyOptions): string {
  try {
    if (!code || typeof code !== 'string') {
      throw new Error('Invalid PHP serialized data provided')
    }
    
    // Import the PHP unserialize function
    const { unserializePHPWithOptions } = require('./php-options')
    const { defaultPHPOptions } = require('./php-options')
    
    // Step 1: Unserialize PHP data to JavaScript object
    const unserialized = unserializePHPWithOptions(code, defaultPHPOptions)
    
    // Step 2: Convert to JSON and beautify
    const jsonString = JSON.stringify(unserialized, null, 2)
    
    // Step 3: Apply custom indentation if different from default
    if (options.indentSize !== 2 || options.indentChar !== 'space') {
      const indentChar = options.indentChar === 'tab' ? '\t' : ' '
      const indentSize = options.indentChar === 'tab' ? 1 : options.indentSize
      const indent = indentChar.repeat(indentSize)
      
      const parsed = JSON.parse(jsonString)
      return JSON.stringify(parsed, null, indent)
    }
    
    return jsonString
  } catch (error) {
    console.error('PHP beautification error:', error)
    return code
  }
}

/**
 * Main beautify function that routes to the appropriate beautifier
 */
export function beautifyCode(code: string, language: 'js' | 'css' | 'json' | 'php', options: BeautifyOptions = defaultBeautifyOptions): string {
  switch (language) {
    case 'js':
      return beautifyJavaScript(code, options)
    case 'css':
      return beautifyCSS(code, options)
    case 'json':
      return beautifyJSON(code, options)
    case 'php':
      return beautifyPHP(code, options)
    default:
      return code
  }
}