/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an 'AS IS' basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Bespin.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Bespin Team (bespin@mozilla.com)
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

var console = require('bespin:console').console;
var bespin = require('appsupport:controllers/bespin').bespinController;

/**
 * The environment plays a similar role to the environment under unix.
 * Bespin does not currently have a concept of variables, (i.e. things the user
 * directly changes, however it does have a number of pre-defined things that
 * are changed by the system.
 * <p>The role of the Environment is likely to be expanded over time.
 */
exports.Environment = function() {
    // The current command line pushes this value into here
    this.commandLine = null;
};

exports.Environment.prototype = {

    /**
     * Retrieves the EditSession
     */
    get session() {
        return bespin.session;
    },

    /**
     * Gets the currentView from the session.
     */
    get view() {
        if (!this.session) {
            // This can happen if the session is being reloaded.
            return null;
        }
        return this.session.currentView;
    },

    /**
     * Returns the currently-active syntax contexts.
     */
    get contexts() {
        // when editorapp is being refreshed, the textView is not available.
        if (!this.view) {
            return [];
        }

        var syntaxManager = this.view.layoutManager.syntaxManager;
        var pos = this.view.getSelectedRange().start;
        return syntaxManager.contextsAtPosition(pos);
    },

    /**
     * The current Buffer from the session
     */
    get buffer() {
        if (!this.session) {
            console.error("command attempted to get buffer but there's no session");
            return undefined;
        }
        return this.session.currentBuffer;
    },

    /**
     * The current editor model might not always be easy to find so you should
     * use <code>instruction.model</code> to access the view where
     * possible.
     */
    get model() {
        if (!this.buffer) {
            console.error('Session has no current buffer');
            return undefined;
        }
        return this.buffer.model;
    },

    /**
     * gets the current file from the session
     */
    get file() {
        if (!this.buffer) {
            console.error('Session has no current buffer');
            return undefined;
        }
        return this.buffer.file;
    },

    /**
     * If files are available, this will get them. Perhaps we need some other
     * mechanism for populating these things from the catalog?
     */
    get files() {
        return bespin.files;
    }
};

/**
 * The global environment.
 * TODO: Check that this is the best way to do this.
 */
exports.global = new exports.Environment();
