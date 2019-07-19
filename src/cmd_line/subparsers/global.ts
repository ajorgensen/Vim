import * as node from '../commands/global';
import * as error from '../../error';
import { Scanner } from '../scanner';
import { parse } from 'path';

function isValidDelimiter(char: string): boolean {
  return !!/^[^\w\s\\|"]{1}$/g.exec(char);
}

/**
 * Global
 * :[range]g[lobal]/{pattern}/[command]
 * For each line in [range] if the line matches the {patter}
 * apply the [command] to the line. For example :g/foo/d will delete
 * all of the lines containing the string 'foo'
 */
export function parseGlobalCommandArgs(args: string): node.GlobalCommand {
  try {
    let searchPattern: string | undefined;
    let command: string;

    let scanner: Scanner;
    let delimiter = args[0];

    scanner = new Scanner(args.substr(1, args.length - 1));

    searchPattern = parsePattern('', scanner, delimiter);
    command = scanner.next();

    return new node.GlobalCommand({
      pattern: searchPattern,
      command: command
    });
  } catch (e) {
    throw error.VimError.fromCode(error.ErrorCode.E486);
  }
}

function parsePattern(pattern: string, scanner: Scanner, delimiter: string): string {
  if (scanner.isAtEof) {
    return pattern;
  }

  let currentChar = scanner.next();
  if (currentChar === delimiter) {
    return pattern;
  } else if (currentChar === '\\') {
    pattern += currentChar;
    if (!scanner.isAtEof) {
      currentChar = scanner.next();
      pattern += currentChar;
    }
    return parsePattern(pattern, scanner, delimiter);
  } else {
    pattern += currentChar;
    return parsePattern(pattern, scanner, delimiter);
  }
}