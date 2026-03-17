import { defineConfig } from "drizzle-kit"
import { readConfig } from "./config"

const gatorConfig = readConfig()

export default defineConfig({
  schema: 'src/lib/db/schema.ts',
  out: 'src/lib/db',
  dialect: 'postgresql',
  dbCredentials: {
    url: gatorConfig.dbUrl
  }
})
