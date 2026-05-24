import path from 'path';
import { app } from 'electron';
import { isDevMode } from './util.js';

export function getPreloadPath(): string {
    if (isDevMode()) {
        return path.join(app.getAppPath(), "dist-electron", "preload.cjs");
    }

    return path.join(process.resourcesPath, "dist-electron", "preload.cjs");
}