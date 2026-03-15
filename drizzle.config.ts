import { defineConfig } from "drizzle-kit"
import { readConfig } from "./config"

const gatorConfig = readConfig()

export default defineConfig({
  schema: 'src/lib/db',
  out: 'src/lib/db',
  dialect: 'postgresql',
  dbCredentials: {
    url: gatorConfig.dbUrl
  }
})
