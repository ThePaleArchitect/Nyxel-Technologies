# Nyxel Technologies - Workspace Rules

## 1. Environment & Commands Execution
*   **Subfolder Context:** The website is a Next.js application nested in the `website/` directory. Always run scripts, dev servers, builds, and package installs inside the `website/` directory, rather than the root workspace folder.
*   **Lucide React Version:** Always use `lucide-react@0.400.0` or lock versions precisely to prevent undefined component exports.

## 2. Styling in Next.js Server Components
*   **No styled-jsx in Server Components:** Do not use `<style jsx>` in React components unless they are explicitly marked as `'use client'`. For global layouts or shared marquee elements, prefer moving `@keyframes` and custom animation helper classes to `src/app/globals.css`.

## 3. Serverless Edge Middleware and In-Memory Fallbacks
*   **Isolation of Runtimes:** Next.js Edge Middleware executes in a separate runtime sandboxed from standard Node.js API handlers. 
*   **Bypass Rule for Mock Redis:** In-memory mocks (e.g. `InMemoryRedisFallback`) do not share memory maps between Edge Middleware and the API handlers. When running locally without active `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` keys:
    *   The Edge Middleware must bypass database session verification checks on protected routes.
    *   Defer session role checking directly to the page load handler via `/api/vault/session` client-side fetches.

## 4. Agent Tool Constraints
*   **Artifact Metadata:** Only supply the `ArtifactMetadata` property when calling creation or modification tools (`write_to_file`, `replace_file_content`, `multi_replace_file_content`) if the target file is located within the artifacts directory `<appDataDir>\brain\<conversation-id>`.

## 5. Locating User-Uploaded Attachments
*   **User Media Files:** When a user references an uploaded file or image in their prompt (e.g., "use this image" or "change logo to this") and it is not found in the workspace or git changes, immediately list the conversation's brain/artifact directory (`C:\Users\dell\.gemini\antigravity-ide\brain\<conversation-id>`) to check for auto-saved media files matching `media__<timestamp>.<ext>`.
