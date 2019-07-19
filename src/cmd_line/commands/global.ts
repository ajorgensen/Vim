import * as vscode from 'vscode';
import * as node from '../node';
import { VimState } from '../../state/vimState';
import { VSCodeVimCursorType } from '../../mode/mode';

export interface IGlobalCommandArguments extends node.ICommandArgs {
  pattern: string | undefined;
  command: string;
}

export class GlobalCommand extends node.CommandBase {
  protected _arguments: IGlobalCommandArguments;
  protected _abort: boolean;

  constructor(args: IGlobalCommandArguments) {
    super();
    this._name = 'global';
    this._arguments = args;
    this._abort = false;
  }

  async execute(vimState: VimState): Promise<void> {
    console.log("TEST");
  }

  async executeWithRange(vimState: VimState, range: node.LineRange): Promise<void> {
    let startLine: vscode.Position;
    let endLine: vscode.Position;

    console.log("executeWithRange");
  }
}