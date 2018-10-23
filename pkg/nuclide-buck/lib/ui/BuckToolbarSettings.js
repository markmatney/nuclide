/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import type {PlatformProviderSettings, TaskSettings} from '../types';

import {Checkbox} from 'nuclide-commons-ui/Checkbox';
import * as React from 'react';

import {shellParseWithGlobs, shellQuote} from 'nuclide-commons/string';
import {AtomInput} from 'nuclide-commons-ui/AtomInput';
import {Button, ButtonTypes} from 'nuclide-commons-ui/Button';
import {ButtonGroup} from 'nuclide-commons-ui/ButtonGroup';
import {LoadingSpinner} from 'nuclide-commons-ui/LoadingSpinner';
import {Modal} from 'nuclide-commons-ui/Modal';
import {Icon} from 'nuclide-commons-ui/Icon';

type Props = {
  buckRoot: string,
  buckversionFileContents: ?(string | Error),
  settings: TaskSettings,
  platformProviderSettings: ?PlatformProviderSettings,
  onDismiss: () => void,
  onSave: (settings: TaskSettings) => void,
};

type State = {
  buildArguments: string,
  runArguments: string,
  compileDbArguments: string,
  keepGoing: boolean,
};

export default class BuckToolbarSettings extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    const {
      buildArguments,
      runArguments,
      compileDbArguments,
      keepGoing,
    } = props.settings;
    this.state = {
      buildArguments: buildArguments == null ? '' : shellQuote(buildArguments),
      runArguments: runArguments == null ? '' : shellQuote(runArguments),
      compileDbArguments:
        compileDbArguments == null ? '' : shellQuote(compileDbArguments),
      keepGoing: keepGoing == null ? true : keepGoing,
    };
  }

  render(): React.Node {
    const extraSettingsUi =
      this.props.platformProviderSettings != null
        ? this.props.platformProviderSettings.ui
        : null;

    return (
      <Modal onDismiss={this.props.onDismiss}>
        <div className="block">
          <div className="block">
            <label>Current Buck root:</label>
            <p>
              <code>{this.props.buckRoot}</code>
            </p>
            <div>
              <label>Buck version:</label>
              {this._getBuckversionFileComponent()}
            </div>
            <label>Build Arguments:</label>
            <AtomInput
              tabIndex="0"
              initialValue={this.state.buildArguments}
              placeholderText="Extra arguments to Buck itself (e.g. --num-threads 4)"
              onDidChange={this._onBuildArgsChange}
              onConfirm={this._onSave.bind(this)}
            />
            <div className="block">
              <Checkbox
                checked={this.state.keepGoing}
                label="Use --keep-going (gathers as many build errors as possible)"
                onChange={this._onKeepGoingChange}
              />
            </div>
            <label>Run Arguments:</label>
            <AtomInput
              tabIndex="0"
              initialValue={this.state.runArguments}
              placeholderText="Custom command-line arguments to pass to the app/binary"
              onDidChange={this._onRunArgsChange}
              onConfirm={this._onSave.bind(this)}
            />
            <label>Compilation Database Arguments:</label>
            <AtomInput
              tabIndex="0"
              initialValue={this.state.compileDbArguments}
              placeholderText="Extra arguments when building for language support (e.g. @mode/dev)"
              onDidChange={this._onCompileDbArgsChange}
              onConfirm={this._onSave.bind(this)}
            />
            {extraSettingsUi}
          </div>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <ButtonGroup>
              <Button onClick={this.props.onDismiss}>Cancel</Button>
              <Button
                buttonType={ButtonTypes.PRIMARY}
                onClick={this._onSave.bind(this)}>
                Save
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Modal>
    );
  }

  _getBuckversionFileComponent(): React.Node {
    const label = ' .buckversion file:';
    const {buckversionFileContents} = this.props;
    if (buckversionFileContents == null) {
      return (
        <p>
          <div className="inline-block">
            <LoadingSpinner
              size="EXTRA_SMALL"
              className="nuclide-buck-buckversion-file-spinner"
            />
          </div>
          {label}
        </p>
      );
    } else if (buckversionFileContents instanceof Error) {
      let errorMessage;
      // $FlowFixMe(>=0.68.0) Flow suppress (T27187857)
      if (buckversionFileContents.code === 'ENOENT') {
        errorMessage = 'not found';
      } else {
        errorMessage = buckversionFileContents.message;
      }
      return (
        <p>
          <Icon icon="x" className="inline-block" />
          {label} {errorMessage}
        </p>
      );
    } else {
      return (
        <p>
          <Icon icon="check" className="inline-block" />
          {label} <code>{buckversionFileContents}</code>
        </p>
      );
    }
  }

  _onBuildArgsChange = (args: string) => {
    this.setState({buildArguments: args});
  };

  _onRunArgsChange = (args: string) => {
    this.setState({runArguments: args});
  };

  _onCompileDbArgsChange = (args: string) => {
    this.setState({compileDbArguments: args});
  };

  _onKeepGoingChange = (checked: boolean) => {
    this.setState({keepGoing: checked});
  };

  _onSave() {
    try {
      this.props.onSave({
        buildArguments: shellParseWithGlobs(this.state.buildArguments),
        runArguments: shellParseWithGlobs(this.state.runArguments),
        compileDbArguments: shellParseWithGlobs(this.state.compileDbArguments),
        keepGoing: this.state.keepGoing,
      });
    } catch (err) {
      atom.notifications.addError('Could not parse arguments', {
        detail: err.stack,
      });
    }
    if (this.props.platformProviderSettings != null) {
      this.props.platformProviderSettings.onSave();
    }
  }
}
