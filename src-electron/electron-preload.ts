import { contextBridge } from 'electron'
import database from './database'

contextBridge.exposeInMainWorld('database', database)
